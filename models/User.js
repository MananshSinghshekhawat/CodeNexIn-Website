const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },

  email: { type: String, required: true, unique: true, lowercase: true },
  emailOtp: { type: String }, // store last OTP sent
  isEmailVerified: { type: Boolean, default: false },

  mobile: { type: String, required: true, unique: true },
  mobileOtp: { type: String },
  isMobileVerified: { type: Boolean, default: false },

  password: { type: String, required: true, minlength: 6, select: false },

  registrationId: { type: String, unique: true }, // auto-generated

  createdAt: { type: Date, default: Date.now }
});

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
