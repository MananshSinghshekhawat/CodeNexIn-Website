const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    default: 'Online'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
