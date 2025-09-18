const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: String,
    required: true
  },
  description: String,
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'on-hold'],
    default: 'not-started'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  teamMembers: [{
    name: String,
    role: String,
    avatar: String
  }],
  budget: Number,
  actualCost: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const revenueRecordSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  growth: {
    type: Number,
    default: 0
  }
});

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  industry: String,
  joinDate: Date,
  projectsCount: {
    type: Number,
    default: 0
  },
  satisfaction: {
    type: Number,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'prospect'],
    default: 'active'
  }
});

const dashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totalProjects: {
    count: {
      type: Number,
      default: 0
    },
    growth: {
      type: Number,
      default: 0
    }
  },
  revenue: {
    current: {
      type: Number,
      default: 0
    },
    growth: {
      type: Number,
      default: 0
    },
    history: [revenueRecordSchema]
  },
  activeClients: {
    count: {
      type: Number,
      default: 0
    },
    growth: {
      type: Number,
      default: 0
    }
  },
  satisfaction: {
    rate: {
      type: Number,
      default: 0
    },
    growth: {
      type: Number,
      default: 0
    }
  },
  projects: [projectSchema],
  clients: [clientSchema],
  serviceDistribution: {
    softwareDevelopment: {
      type: Number,
      default: 0
    },
    aiMl: {
      type: Number,
      default: 0
    },
    cloudSolutions: {
      type: Number,
      default: 0
    },
    consulting: {
      type: Number,
      default: 0
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better performance
dashboardSchema.index({ userId: 1 });

module.exports = mongoose.model('Dashboard', dashboardSchema);