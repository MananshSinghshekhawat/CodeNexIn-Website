const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  projectType: {
    type: String,
    required: true,
    enum: [
      'Custom Software Development',
      'AI & Machine Learning',
      'Data Analytics & BI',
      'Cloud Solutions',
      'Digital Transformation',
      'Mobile Development',
      'Cybersecurity',
      'Consulting & Strategy',
      'Other'
    ]
  },
  projectBudget: {
    type: String,
    enum: [
      '$5,000 - $15,000',
      '$15,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000 - $250,000',
      '$250,000+',
      'Not sure yet'
    ]
  },
  projectDescription: {
    type: String,
    required: true,
    maxlength: 2000
  },
  urgency: {
    type: String,
    enum: ['Normal', 'Urgent', 'Emergency'],
    default: 'Normal'
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Contacted', 'Closed'],
    default: 'New'
  },
  source: {
    type: String,
    default: 'Website Form'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    content: {
      type: String,
      required: true
    },
    addedBy: {
      type: String,
      default: 'System'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);