const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  getProjectStats,
  getRevenueData,
  updateDashboardSettings
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// GET /api/dashboard - Get complete dashboard data
router.get('/', getDashboardData);

// GET /api/dashboard/stats/projects - Get project statistics
router.get('/stats/projects', getProjectStats);

// GET /api/dashboard/stats/revenue - Get revenue data
router.get('/stats/revenue', getRevenueData);

// PUT /api/dashboard/settings - Update dashboard settings
router.put('/settings', updateDashboardSettings);

module.exports = router;