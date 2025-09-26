// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true,  maxlength: 50  },
//   lastName: { type: String, required: true, trim: true,  maxlength: 50  },
//   dob: { type: Date, required: true },

//   email: { type: String, required: true, unique: true, lowercase: true  , match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']},
//   emailOtp: { type: String }, // store last OTP sent
//   isEmailVerified: { type: Boolean, default: false },

//   mobile: { type: String, required: true, unique: true ,  match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']},
//   mobileOtp: { type: String },
//   isMobileVerified: { type: Boolean, default: false },

//   password: { type: String, required: true, minlength: 6, select: false },

//   registrationId: { type: String, unique: true }, // auto-generated

//   createdAt: { type: Date, default: Date.now }
// });

// //  Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Compare password for login
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 50 
  },
  lastName: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 50 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  emailOtp: { 
    type: String,
    select: false
  },
  emailOtpExpiry: {
    type: Date,
    select: false
  },
  isEmailVerified: { 
    type: Boolean, 
    default: false 
  },
  mobile: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  mobileOtp: { 
    type: String,
    select: false
  },
  mobileOtpExpiry: {
    type: Date,
    select: false
  },
  isMobileVerified: { 
    type: Boolean, 
    default: false 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6,
    select: false 
  },
  registrationId: { 
    type: String, 
    unique: true 
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'customer'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });
userSchema.index({ registrationId: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { lockUntil: Date.now() + 30 * 60 * 1000 }; // 30 minutes lock
  }
  
  return this.updateOne(updates);
};

// Reset login attempts after successful login
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Transform output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.emailOtp;
  delete user.emailOtpExpiry;
  delete user.mobileOtp;
  delete user.mobileOtpExpiry;
  delete user.loginAttempts;
  delete user.lockUntil;
  return user;
};

module.exports = mongoose.model("User", userSchema);

// Remove this example controller code from your model file.
// Controller logic should NOT be inside the model file.
// Move the following code to your controller (e.g., controllers/authController.js):

/*
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { firstName, lastName, dob, email, mobile, password, confirmPassword } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or mobile number'
      });
    }
    // Create user if unique
    const user = await User.create({
      firstName,
      lastName,
      dob,
      email,
      mobile,
      password,
      registrationId: require('uuid').v4()
    });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
*/