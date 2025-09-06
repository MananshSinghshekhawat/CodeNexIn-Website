const express = require('express');
const router = express.Router();
const { getAboutContent, updateAboutContent } = require('../controllers/aboutController');

// Public routes
router.get('/', getAboutContent);
router.put('/admin', updateAboutContent);

module.exports = router;