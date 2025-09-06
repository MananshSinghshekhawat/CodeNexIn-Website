const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  heroBanner: {
    tagline: {
      type: String,
      required: true,
      default: "Transforming Ideas into Digital Reality"
    },
    subtitle: {
      type: String,
      default: "CodeNexIn empowers businesses with cutting-edge technology solutions, from AI-powered analytics to scalable cloud platforms. Let's build the future together."
    },
    ctaButton: {
      text: {
        type: String,
        default: "Get Started"
      },
      link: {
        type: String,
        default: "/contact"
      }
    },
    secondaryButton: {
      text: {
        type: String,
        default: "View Our Work"
      },
      link: {
        type: String,
        default: "/portfolio"
      }
    }
  },
  keyHighlights: [{
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
      default: "🚀"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  servicesOverview: [{
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
      default: "💡"
    },
    link: {
      type: String,
      default: "/services"
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  whyChooseUs: [{
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
      default: "⚡"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  pricingPlans: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    features: [{
      type: String,
      required: true
    }],
    ctaButton: {
      text: {
        type: String,
        default: "Get Started"
      },
      link: {
        type: String,
        default: "/contact"
      }
    },
    isPopular: {
      type: Boolean,
      default: false
    }
  }],
  clientLogos: [{
    name: {
      type: String,
      required: true
    },
    logo: {
      url: String,
      alt: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  stats: [{
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  seoMetadata: {
    title: {
      type: String,
      default: "CodeNexIn - AI Solutions & Digital Innovation"
    },
    description: {
      type: String,
      default: "CodeNexIn provides cutting-edge AI solutions, custom software development, and digital transformation services for businesses worldwide."
    },
    keywords: [String]
  },
  contactInfo: {
    email: {
      type: String,
      default: "hello@codenexin.com"
    },
    phone: {
      type: String,
      default: "+1 (555) 123-4567"
    },
    address: {
      type: String,
      default: "San Francisco, CA"
    }
  },
  newsletter: {
    title: {
      type: String,
      default: "Stay Updated"
    },
    description: {
      type: String,
      default: "Subscribe to our newsletter for the latest technology insights and updates."
    },
    placeholder: {
      type: String,
      default: "Enter your email"
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Only one home document should exist
homeSchema.statics.getHomeContent = function() {
  return this.findOne().sort({ createdAt: -1 });
};

module.exports = mongoose.model('Home', homeSchema);