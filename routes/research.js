const express = require('express');
const router = express.Router();
const {
  getAllResearch,
  getResearchBySlug,
  getFeaturedResearch,
  getResearchCategories,
  getResearchStats,
  incrementDownloadCount,
  searchResearch,
  createResearch,
  updateResearch,
  deleteResearch
} = require('../controllers/researchController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllResearch);
router.get('/categories', getResearchCategories);
router.get('/stats', getResearchStats);
router.get('/featured', getFeaturedResearch);
router.get('/search', searchResearch);
router.get('/:slug', getResearchBySlug);
router.put('/:slug/download', incrementDownloadCount);

// Admin routes (protected)
router.post('/', protect, authorize('admin'), createResearch);
router.put('/:id', protect, authorize('admin'), updateResearch);
router.delete('/:id', protect, authorize('admin'), deleteResearch);

module.exports = router;