const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Simple dashboard data (for testing)
const getDashboardData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        welcomeMessage: "Welcome to your dashboard!",
        totalProjects: 127,
        revenue: 67000,
        activeClients: 43,
        satisfaction: 98,
        recentActivities: [
          "New project assigned",
          "Client meeting scheduled",
          "Report generated"
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
};

const getProjectStats = async (req, res) => {
  res.json({
    success: true,
    data: {
      total: 127,
      completed: 89,
      inProgress: 28,
      onHold: 10
    }
  });
};

const getRevenueData = async (req, res) => {
  res.json({
    success: true,
    data: [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 58000 }
    ]
  });
};

// All dashboard routes are protected
router.use(protect);

router.get('/', getDashboardData);
router.get('/stats/projects', getProjectStats);
router.get('/stats/revenue', getRevenueData);

module.exports = router;