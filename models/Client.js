const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
  },
  website: {
    type: String,
    trim: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
clientSchema.index({ isActive: 1, isFeatured: 1, order: 1 });

module.exports = mongoose.model('Client', clientSchema);