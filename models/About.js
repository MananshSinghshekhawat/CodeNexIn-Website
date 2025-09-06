const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  heroSection: {
    title: {
      type: String,
      default: "Pioneering Digital Innovation Since 2014"
    },
    subtitle: {
      type: String,
      default: "We are a team of passionate technologists, strategists, and innovators committed to transforming businesses through cutting-edge technology solutions."
    },
    image: {
      url: String,
      alt: String
    }
  },
  ourStory: {
    title: {
      type: String,
      default: "Our Story"
    },
    content: {
      type: String,
      default: "CodeNexIn was founded in 2014 by a group of software engineers who witnessed firsthand the challenges businesses faced in adopting new technologies. We saw companies struggling with outdated systems, inefficient processes, and the inability to harness the power of their data."
    },
    milestones: [{
      year: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }]
  },
  mission: {
    title: {
      type: String,
      default: "Our Mission"
    },
    description: {
      type: String,
      default: "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age."
    },
    principles: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        default: "🎯"
      }
    }]
  },
  vision: {
    title: {
      type: String,
      default: "Our Vision"
    },
    description: {
      type: String,
      default: "To be the leading catalyst for digital transformation, enabling businesses to thrive in an increasingly technology-driven world."
    }
  },
  coreValues: {
    title: {
      type: String,
      default: "Our Core Values"
    },
    description: {
      type: String,
      default: "The principles that guide everything we do and shape how we work with our clients and each other."
    },
    values: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        default: "✨"
      }
    }]
  },
  whyChooseUs: {
    title: {
      type: String,
      default: "Why Choose CodeNexIn?"
    },
    description: {
      type: String,
      default: "We bring together technical expertise, industry knowledge, and a passion for innovation to deliver exceptional results."
    },
    features: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        default: "⭐"
      },
      stats: {
        value: String,
        label: String
      }
    }]
  },
  teamStats: [{
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "👥"
    }
  }],
  seoMetadata: {
    title: {
      type: String,
      default: "About CodeNexIn - Our Story, Mission & Values"
    },
    description: {
      type: String,
      default: "Learn about CodeNexIn's journey since 2014, our mission to drive digital transformation, and the core values that guide our work with clients."
    },
    keywords: [String]
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Only one about document should exist
aboutSchema.statics.getAboutContent = function() {
  return this.findOne().sort({ createdAt: -1 });
};

module.exports = mongoose.model('About', aboutSchema);