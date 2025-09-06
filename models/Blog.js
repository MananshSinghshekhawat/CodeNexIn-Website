const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  tags: [String],
  thumbnail: String,
  publishedDate: {type: Date, default: Date.now},
  status: {type: String, default: "draft"},
  created_at: {type: Date, default: Date.now}
});

modules.exports = mongoose.model('Blog', BlogSchema);
