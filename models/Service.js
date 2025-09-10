// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   heroSection: {
//     title: {
//       type: String,
//       default: "Comprehensive Technology Solutions"
//     },
//     subtitle: {
//       type: String,
//       default: "From custom software development to AI implementation, we offer a full spectrum of technology services to help your business thrive in the digital age."
//     },
//     image: {
//       url: String,
//       alt: String
//     }
//   },
//   services: [{
//     title: {
//       type: String,
//       required: true
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     icon: {
//       type: String,
//       default: "💻"
//     },
//     keyFeatures: [{
//       type: String,
//       required: true
//     }],
//     technologies: [{
//       type: String,
//       required: true
//     }],
//     useCases: [{
//       industry: {
//         type: String,
//         required: true
//       },
//       description: {
//         type: String,
//         required: true
//       }
//     }],
//     ctaButton: {
//       text: {
//         type: String,
//         default: "Get Started"
//       },
//       link: {
//         type: String,
//         default: "/contact"
//       }
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     },
//     order: {
//       type: Number,
//       default: 0
//     }
//   }],
//   industries: [{
//     name: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     icon: {
//       type: String,
//       default: "🏢"
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   }],
//   technologies: [{
//     name: {
//       type: String,
//       required: true
//     },
//     category: {
//       type: String,
//       enum: ['frontend', 'backend', 'database', 'cloud', 'ai-ml', 'devops'],
//       required: true
//     },
//     logo: {
//       url: String,
//       alt: String
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   }],
//   ctaSection: {
//     title: {
//       type: String,
//       default: "Ready to Transform Your Business?"
//     },
//     description: {
//       type: String,
//       default: "Let's discuss how our technology solutions can help you achieve your business goals. Our team of experts is ready to guide you through your digital transformation journey."
//     },
//     buttons: [{
//       text: {
//         type: String,
//         default: "Schedule a Consultation"
//       },
//       link: {
//         type: String,
//         default: "/contact"
//       },
//       variant: {
//         type: String,
//         default: "primary"
//       }
//     }, {
//       text: {
//         type: String,
//         default: "View Our Portfolio"
//       },
//       link: {
//         type: String,
//         default: "/portfolio"
//       },
//       variant: {
//         type: String,
//         default: "secondary"
//       }
//     }]
//   },
//   seoMetadata: {
//     title: {
//       type: String,
//       default: "Services - CodeNexIn Technology Solutions"
//     },
//     description: {
//       type: String,
//       default: "Discover our comprehensive technology services including custom software development, AI solutions, data analytics, cloud services, and digital transformation."
//     },
//     keywords: [String]
//   },
//   lastUpdated: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// // Generate slug for each service before saving
// serviceSchema.pre('save', function(next) {
//   if (this.isModified('services')) {
//     this.services.forsEach(service => {
//       if (service.title) {
//         service.slug = service.title
//           .toLowerCase()
//           .replace(/[^a-z0-9 -]/g, '')
//           .replace(/\s+/g, '-')
//           .replace(/-+/g, '-')
//           .trim();
//       }
//     });
//   }
//   next();
// });

// // Only one service document should exist
// serviceSchema.statics.getServicesContent = function() {
//   return this.findOne().sort({ createdAt: -1 });
// };

// module.exports = mongoose.model('Service', serviceSchema);


const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  heroSection: {
    title: {
      type: String,
      default: "Comprehensive Technology Solutions"
    },
    subtitle: {
      type: String,
      default: "From custom software development to AI implementation, we offer a full spectrum of technology services to help your business thrive in the digital age."
    },
    image: {
      url: String,
      alt: String
    }
  },
  services: [{
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "💻"
    },
    keyFeatures: [{
      type: String,
      required: true
    }],
    technologies: [{
      type: String,
      required: true
    }],
    useCases: [{
      industry: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
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
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  industries: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "🏢"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  technologies: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'cloud', 'ai-ml', 'devops'],
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
  ctaSection: {
    title: {
      type: String,
      default: "Ready to Transform Your Business?"
    },
    description: {
      type: String,
      default: "Let's discuss how our technology solutions can help you achieve your business goals. Our team of experts is ready to guide you through your digital transformation journey."
    },
    buttons: [{
      text: {
        type: String,
        default: "Schedule a Consultation"
      },
      link: {
        type: String,
        default: "/contact"
      },
      variant: {
        type: String,
        default: "primary"
      }
    }, {
      text: {
        type: String,
        default: "View Our Portfolio"
      },
      link: {
        type: String,
        default: "/portfolio"
      },
      variant: {
        type: String,
        default: "secondary"
      }
    }]
  },
  seoMetadata: {
    title: {
      type: String,
      default: "Services - CodeNexIn Technology Solutions"
    },
    description: {
      type: String,
      default: "Discover our comprehensive technology services including custom software development, AI solutions, data analytics, cloud services, and digital transformation."
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

// Only one service document should exist
serviceSchema.statics.getServicesContent = function() {
  return this.findOne().sort({ createdAt: -1 });
};

// Method to find service by slug
serviceSchema.statics.findServiceBySlug = async function(slug) {
  const servicesContent = await this.findOne().sort({ createdAt: -1 });
  if (!servicesContent) return null;
  
  return servicesContent.services.find(service => 
    service.slug === slug && service.isActive
  );
};

module.exports = mongoose.model('Service', serviceSchema);