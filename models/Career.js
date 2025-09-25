const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  resumeUrl: { type: String, trim: true }, // could be a link to uploaded resume
  message: { type: String, trim: true },
  appliedAt: { type: Date, default: Date.now }
}, { _id: true });

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, trim: true },
  employment_type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
    default: "Full-time"
  },
  experience_level: {
    type: String,
    enum: ["Fresher", "Experienced"],
    default: "Fresher"
  },
  requirements: [{ type: String }],
  apply_link: { type: String, trim: true },
  posted_date: { type: Date, default: Date.now },
  closing_date: { type: Date },
  isActive: { type: Boolean, default: true },
  applications: [applicationSchema],
  created_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model("Career", careerSchema);
