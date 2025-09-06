const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial } = require('../controllers/testimonialController');

// Public routes
router.get('/', getTestimonials);
router.post('/', createTestimonial);

module.exports = router;