const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username : {type: String, required: true, unique: true},
  email : {type: String, required: true, unique: true},
  password : {type: String, required: true},
  role : {type: String, enum: ["superadmin", "editor", "moderator"], default: "editor"},
  created_at: {typye: Date, default: Date.now},
  last_login: {type: Date},
  status: {type: String, enum: ["active", "inactive"], default: "active"}
});

// hash password before saving
adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
