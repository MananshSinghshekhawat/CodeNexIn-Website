const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String },
  content: { type: String },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Research", researchSchema);
