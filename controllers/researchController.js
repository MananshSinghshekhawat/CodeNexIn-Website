const Research = require('../models/Research');

// Get all research papers with filtering and pagination
const getAllResearch = async (req, res) => {
  try {
    const { 
      category, 
      tag, 
      author, 
      featured, 
      limit = 12, 
      page = 1,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;
    
    let filter = { status: 'published' };
    
    if (category) {
      filter.category = category;
    }
    
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    if (author) {
      filter.author = new RegExp(author, 'i');
    }
    
    if (featured !== undefined) {
      filter.isFeatured = featured === 'true';
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const researchPapers = await Research.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content -__v');
    
    const totalPapers = await Research.countDocuments(filter);
    
    // Get unique categories and tags for filters
    const categories = await Research.distinct('category', { status: 'published' });
    const allTags = await Research.distinct('tags', { status: 'published' });
    
    res.json({
      success: true,
      data: researchPapers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPapers / parseInt(limit)),
        totalPapers,
        papersPerPage: parseInt(limit)
      },
      filters: {
        categories,
        tags: allTags.filter(tag => tag).slice(0, 20) // Limit to top 20 tags
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching research papers',
      error: error.message
    });
  }
};

// Get single research paper by slug
const getResearchBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const researchPaper = await Research.findOneAndUpdate(
      { slug, status: 'published' },
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    
    if (!researchPaper) {
      return res.status(404).json({
        success: false,
        message: 'Research paper not found'
      });
    }
    
    res.json({
      success: true,
      data: researchPaper
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching research paper',
      error: error.message
    });
  }
};

// Get featured research papers
const getFeaturedResearch = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featuredResearch = await Research.find({
      isFeatured: true,
      status: 'published'
    })
    .sort({ publishedAt: -1 })
    .limit(parseInt(limit))
    .select('-content -__v');
    
    res.json({
      success: true,
      data: featuredResearch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured research',
      error: error.message
    });
  }
};

// Get research categories
const getResearchCategories = async (req, res) => {
  try {
    const categories = await Research.distinct('category', { status: 'published' });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching research categories',
      error: error.message
    });
  }
};

// Get research statistics
const getResearchStats = async (req, res) => {
  try {
    const totalPapers = await Research.countDocuments({ status: 'published' });
    const totalViews = await Research.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, totalViews: { $sum: '$viewCount' } } }
    ]);
    const totalDownloads = await Research.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);
    const totalCitations = await Research.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, totalCitations: { $sum: '$citations' } } }
    ]);
    
    const categoryStats = await Research.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalPapers,
        totalViews: totalViews[0]?.totalViews || 0,
        totalDownloads: totalDownloads[0]?.totalDownloads || 0,
        totalCitations: totalCitations[0]?.totalCitations || 0,
        categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching research statistics',
      error: error.message
    });
  }
};

// Increment download count
const incrementDownloadCount = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const researchPaper = await Research.findOneAndUpdate(
      { slug, status: 'published' },
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    
    if (!researchPaper) {
      return res.status(404).json({
        success: false,
        message: 'Research paper not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Download count incremented',
      downloadCount: researchPaper.downloadCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error incrementing download count',
      error: error.message
    });
  }
};

// Search research papers
const searchResearch = async (req, res) => {
  try {
    const { q, category, limit = 10, page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let filter = { status: 'published' };
    
    // Build search query
    const searchQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { abstract: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };
    
    if (category) {
      filter.category = category;
    }
    
    filter = { ...filter, ...searchQuery };
    
    const researchPapers = await Research.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content -__v');
    
    const totalResults = await Research.countDocuments(filter);
    
    res.json({
      success: true,
      data: researchPapers,
      searchInfo: {
        query: q,
        totalResults,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalResults / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching research papers',
      error: error.message
    });
  }
};

// Admin: Create new research paper
const createResearch = async (req, res) => {
  try {
    const researchPaper = new Research(req.body);
    await researchPaper.save();
    
    res.status(201).json({
      success: true,
      message: 'Research paper created successfully',
      data: researchPaper
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating research paper',
      error: error.message
    });
  }
};

// Admin: Update research paper
const updateResearch = async (req, res) => {
  try {
    const { id } = req.params;
    
    const researchPaper = await Research.findByIdAndUpdate(
      id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!researchPaper) {
      return res.status(404).json({
        success: false,
        message: 'Research paper not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Research paper updated successfully',
      data: researchPaper
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating research paper',
      error: error.message
    });
  }
};

// Admin: Delete research paper
const deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;
    
    const researchPaper = await Research.findByIdAndDelete(id);
    
    if (!researchPaper) {
      return res.status(404).json({
        success: false,
        message: 'Research paper not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Research paper deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting research paper',
      error: error.message
    });
  }
};

module.exports = {
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
};