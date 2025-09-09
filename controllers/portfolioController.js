const Portfolio = require('../models/Portfolio');

// Get all portfolio items with filtering
const getAllPortfolioItems = async (req, res) => {
  try {
    const { category, industry, year, featured, limit = 12, page = 1 } = req.query;
    
    let filter = { isActive: true };
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (industry) {
      filter['client.industry'] = industry;
    }
    
    if (year) {
      filter.year = parseInt(year);
    }
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const portfolioItems = await Portfolio.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    const totalItems = await Portfolio.countDocuments(filter);
    
    res.json({
      success: true,
      data: portfolioItems,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalItems / parseInt(limit)),
        totalItems,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio items',
      error: error.message
    });
  }
};

// Get single portfolio item by slug
const getPortfolioItemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const portfolioItem = await Portfolio.findOne({ 
      slug, 
      isActive: true 
    }).select('-__v');
    
    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    res.json({
      success: true,
      data: portfolioItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio item',
      error: error.message
    });
  }
};

// Get portfolio categories
const getPortfolioCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Get portfolio industries
const getPortfolioIndustries = async (req, res) => {
  try {
    const industries = await Portfolio.distinct('client.industry', { isActive: true });
    
    res.json({
      success: true,
      data: industries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching industries',
      error: error.message
    });
  }
};

// Get featured portfolio items
const getFeaturedPortfolioItems = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featuredItems = await Portfolio.find({ 
      featured: true, 
      isActive: true 
    })
    .sort({ order: 1, createdAt: -1 })
    .limit(parseInt(limit))
    .select('-__v');
    
    res.json({
      success: true,
      data: featuredItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured portfolio items',
      error: error.message
    });
  }
};

// Create new portfolio item (Admin only)
const createPortfolioItem = async (req, res) => {
  try {
    const portfolioItem = new Portfolio(req.body);
    await portfolioItem.save();
    
    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolioItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating portfolio item',
      error: error.message
    });
  }
};

// Update portfolio item (Admin only)
const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const portfolioItem = await Portfolio.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolioItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating portfolio item',
      error: error.message
    });
  }
};

// Delete portfolio item (Admin only)
const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const portfolioItem = await Portfolio.findByIdAndDelete(id);
    
    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting portfolio item',
      error: error.message
    });
  }
};

module.exports = {
  getAllPortfolioItems,
  getPortfolioItemBySlug,
  getPortfolioCategories,
  getPortfolioIndustries,
  getFeaturedPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
};