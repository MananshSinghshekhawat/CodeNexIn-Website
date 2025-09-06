const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  description: { type: String },
  images: [String],
  clientName: { type: String },
  industry: { type: String },
  outcome: { type: String },
  category: { type: String },
  completedAt: { type: Date }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
