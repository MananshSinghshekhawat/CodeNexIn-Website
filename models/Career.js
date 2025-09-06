const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  location: String,
  employment_type: {type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], default: "Full-time"},
  experience_level : {type: String, enum: ["Fresher", "Experienced"], default: "Fresher"},
  requirements: [String],
  apply_link: String,
  posted_date: {type: Date, default: Date.now},
  closing_date: Date,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Carrer", careerSchema);

  
