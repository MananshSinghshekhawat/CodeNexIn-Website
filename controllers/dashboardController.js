const Dashboard = require('../models/Dashboard');
const Project = require('../models/Project');
const User = require('../models/User');

// Get dashboard data for authenticated user
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let dashboard = await Dashboard.findOne({ userId })
      .populate('userId', 'name email avatar')
      .lean();

    if (!dashboard) {
      // Create default dashboard if not exists
      dashboard = await createDefaultDashboard(userId);
    }

    // Get recent projects
    const recentProjects = await Project.find({ userId, isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Calculate additional metrics
    const metrics = await calculateDashboardMetrics(userId);

    const response = {
      success: true,
      data: {
        ...dashboard,
        recentProjects,
        metrics
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

// Get project statistics
const getProjectStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const stats = await Project.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalBudget: { $sum: '$budget' }
        }
      }
    ]);

    const totalProjects = await Project.countDocuments({ 
      userId, 
      isActive: true 
    });

    const completedProjects = await Project.countDocuments({ 
      userId, 
      status: 'completed',
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        statusDistribution: stats,
        totalProjects,
        completedProjects,
        completionRate: totalProjects > 0 ? (completedProjects / totalProjects * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project statistics',
      error: error.message
    });
  }
};

// Get revenue data
const getRevenueData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = 'monthly' } = req.query;

    let revenueData = [];
    
    if (period === 'monthly') {
      revenueData = await getMonthlyRevenue(userId);
    } else if (period === 'quarterly') {
      revenueData = await getQuarterlyRevenue(userId);
    }

    res.json({
      success: true,
      data: revenueData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue data',
      error: error.message
    });
  }
};

// Update dashboard settings
const updateDashboardSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: 'Dashboard not found'
      });
    }

    res.json({
      success: true,
      message: 'Dashboard settings updated successfully',
      data: dashboard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating dashboard settings',
      error: error.message
    });
  }
};

// Helper function to create default dashboard
const createDefaultDashboard = async (userId) => {
  const defaultDashboard = new Dashboard({
    userId,
    totalProjects: {
      count: 127,
      growth: 12
    },
    revenue: {
      current: 67000,
      growth: 22,
      history: [
        { month: 'Jan', year: 2025, amount: 45000, growth: 15 },
        { month: 'Feb', year: 2025, amount: 52000, growth: 18 },
        { month: 'Mar', year: 2025, amount: 58000, growth: 20 },
        { month: 'Apr', year: 2025, amount: 62000, growth: 21 },
        { month: 'May', year: 2025, amount: 65000, growth: 22 },
        { month: 'Jun', year: 2025, amount: 67000, growth: 22 }
      ]
    },
    activeClients: {
      count: 43,
      growth: 8
    },
    satisfaction: {
      rate: 98,
      growth: 2
    },
    serviceDistribution: {
      softwareDevelopment: 35,
      aiMl: 25,
      cloudSolutions: 20,
      consulting: 20
    }
  });

  return await defaultDashboard.save();
};

// Helper function to calculate dashboard metrics
const calculateDashboardMetrics = async (userId) => {
  const totalProjects = await Project.countDocuments({ userId, isActive: true });
  const completedProjects = await Project.countDocuments({ 
    userId, 
    status: 'completed',
    isActive: true 
  });
  const overdueProjects = await Project.countDocuments({ 
    userId, 
    deadline: { $lt: new Date() },
    status: { $ne: 'completed' },
    isActive: true 
  });

  return {
    totalProjects,
    completedProjects,
    overdueProjects,
    completionRate: totalProjects > 0 ? (completedProjects / totalProjects * 100) : 0
  };
};

// Helper function to get monthly revenue
const getMonthlyRevenue = async (userId) => {
  // This would typically query your revenue/transactions database
  // For now, returning mock data as shown in the image
  return [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 58000 },
    { month: 'Apr', revenue: 62000 },
    { month: 'May', revenue: 65000 },
    { month: 'Jun', revenue: 67000 }
  ];
};

// Helper function to get quarterly revenue
const getQuarterlyRevenue = async (userId) => {
  // Similar implementation for quarterly data
  return [
    { quarter: 'Q1', revenue: 155000 },
    { quarter: 'Q2', revenue: 194000 }
  ];
};

module.exports = {
  getDashboardData,
  getProjectStats,
  getRevenueData,
  updateDashboardSettings
};