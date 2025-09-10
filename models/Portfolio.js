const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: String,
  category: String
});

const portfolioItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  detailedDescription: String,
  category: {
    type: String,
    required: true,
    enum: ['AI Solutions', 'Data Analytics', 'Healthcare', 'Education', 'Finance', 'Retail', 'Agriculture']
  },
  subCategory: String,
  client: {
    name: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    logo: {
      url: String,
      alt: String
    }
  },
  year: {
    type: Number,
    required: true
  },
  keyOutcomes: [{
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    description: String
  }],
  technologies: [technologySchema],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  videos: [{
    url: String,
    title: String,
    description: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'upcoming'],
    default: 'completed'
  },
  projectDuration: {
    startDate: Date,
    endDate: Date,
    duration: String
  },
  teamSize: Number,
  projectUrl: String,
  caseStudyUrl: String,
  githubUrl: String,
  seoMetadata: {
    title: String,
    description: String,
    keywords: [String]
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

// Create slug from title
portfolioItemSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// Index for better performance
portfolioItemSchema.index({ category: 1, isActive: 1, featured: 1 });
portfolioItemSchema.index({ slug: 1 });
portfolioItemSchema.index({ 'client.industry': 1 });

module.exports = mongoose.model('Portfolio', portfolioItemSchema);