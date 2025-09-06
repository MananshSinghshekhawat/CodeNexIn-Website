const express = require('express');
const router = express.Router();
const { getHomeContent, updateHomeContent } = require('../controllers/homeController');

// Public routes
router.get('/', getHomeContent);
router.put('/admin', updateHomeContent);

module.exports = router;