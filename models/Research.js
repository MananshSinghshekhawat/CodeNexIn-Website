const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  abstract: { 
    type: String,
    required: true,
    maxlength: 500
  },
  content: { 
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['AI & Machine Learning', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'Blockchain', 'IoT', 'Web Development', 'Mobile Development']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: { 
    type: String,
    required: true
  },
  authorBio: String,
  coAuthors: [{
    name: String,
    affiliation: String
  }],
  images: [{
    url: String,
    caption: String,
    alt: String
  }],
  featuredImage: {
    url: String,
    caption: String,
    alt: String
  },
  pdfUrl: String,
  githubUrl: String,
  demoUrl: String,
  publishedAt: { 
    type: Date, 
    default: Date.now 
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  citations: {
    type: Number,
    default: 0
  },
  seoMetadata: {
    title: String,
    description: String,
    keywords: [String]
  },
  metaDescription: String,
  keywords: [String]
}, {
  timestamps: true
});

// Create slug from title
researchSchema.pre('save', function(next) {
  if (this.isModified('title') && (!this.slug || this.slug === '')) {
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
researchSchema.index({ category: 1, status: 1, isFeatured: 1 });
researchSchema.index({ slug: 1 });
researchSchema.index({ tags: 1 });
researchSchema.index({ publishedAt: -1 });

module.exports = mongoose.model("Research", researchSchema);