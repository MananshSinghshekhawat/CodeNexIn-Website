const express = require('express');
const router = express.Router();
const { getLatestBlogs, getAllBlogs } = require('../controllers/blogController');

// Public routes
router.get('/latest', getLatestBlogs);
router.get('/', getAllBlogs);

module.exports = router;