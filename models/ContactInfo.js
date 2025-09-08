const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: "CodeNexIn"
  },
  email: {
    type: String,
    default: "hello@codenexin.com"
  },
  phone: {
    type: String,
    default: "+1 (555) 123-4567"
  },
  address: {
    street: {
      type: String,
      default: "123 Tech Street, Suite 456"
    },
    city: {
      type: String,
      default: "San Francisco"
    },
    state: {
      type: String,
      default: "CA"
    },
    zipCode: {
      type: String,
      default: "94105"
    },
    country: {
      type: String,
      default: "USA"
    }
  },
  businessHours: {
    mondayToFriday: {
      type: String,
      default: "9:00 AM - 6:00 PM"
    },
    saturday: {
      type: String,
      default: "10:00 AM - 4:00 PM"
    },
    sunday: {
      type: String,
      default: "Closed"
    },
    timezone: {
      type: String,
      default: "PST"
    }
  },
  emergencySupport: {
    available: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: "For urgent technical support or critical issues, our emergency support team is available 24/7."
    },
    contact: {
      type: String,
      default: "+1 (555) EMERGENCY"
    }
  },
  socialMedia: {
    linkedin: {
      type: String,
      default: "https://linkedin.com/company/codenexin"
    },
    twitter: {
      type: String,
      default: "https://twitter.com/codenexin"
    },
    github: {
      type: String,
      default: "https://github.com/codenexin"
    },
    facebook: {
      type: String,
      default: "https://facebook.com/codenexin"
    }
  },
  responseTime: {
    type: String,
    default: "24 hours"
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Only one contact info document should exist
contactInfoSchema.statics.getContactInfo = function() {
  return this.findOne().sort({ createdAt: -1 });
};

module.exports = mongoose.model('ContactInfo', contactInfoSchema);