const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  client: String,
  progress: Number,
  deadline: Date,
  status: String,
  priority: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  budget: Number
  // ...add more fields as needed...
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
