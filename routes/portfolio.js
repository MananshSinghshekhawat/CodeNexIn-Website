const express = require('express');
const router = express.Router();
const {
  getAllPortfolioItems,
  getPortfolioItemBySlug,
  getPortfolioCategories,
  getPortfolioIndustries,
  getFeaturedPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
} = require('../controllers/portfolioController');

// Public routes
router.get('/', getAllPortfolioItems);
router.get('/categories', getPortfolioCategories);
router.get('/industries', getPortfolioIndustries);
router.get('/featured', getFeaturedPortfolioItems);
router.get('/:slug', getPortfolioItemBySlug);


router.post('/', createPortfolioItem);
router.put('/:id', updatePortfolioItem);
router.delete('/:id', deletePortfolioItem);

module.exports = router;