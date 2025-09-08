const express = require('express');
const router = express.Router();
const { getServicesContent, getServiceBySlug, updateServicesContent } = require('../controllers/serviceController');

// Public routes
router.get('/', getServicesContent);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.put('/admin', updateServicesContent);

module.exports = router;