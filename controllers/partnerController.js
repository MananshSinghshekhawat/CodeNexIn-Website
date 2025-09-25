const Partner = require('../models/Partner');

/**
 * Create a new partner
 */
exports.createPartner = async (req, res) => {
  try {
    const partner = new Partner(req.body);
    await partner.save();
    return res.status(201).json(partner);
  } catch (err) {
    // duplicate email error handling
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(400).json({ message: err.message || 'Failed to create partner' });
  }
};

/**
 * Get all partners (with optional query params)
 */
exports.getAllPartners = async (req, res) => {
  try {
    // Basic pagination and filters (optional)
    const { page = 1, limit = 50, q } = req.query;
    const filter = {};
    if (q) {
      // text search on name, email, organization
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { organization: { $regex: q, $options: 'i' } }
      ];
    }

    const partners = await Partner.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Partner.countDocuments(filter);

    return res.json({
      data: partners,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch partners' });
  }
};

/**
 * Get partner by ID
 */
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    return res.json(partner);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch partner' });
  }
};

/**
 * Update partner by ID
 */
exports.updatePartner = async (req, res) => {
  try {
    const updated = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Partner not found' });
    return res.json(updated);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(400).json({ message: err.message || 'Failed to update partner' });
  }
};

/**
 * Delete partner by ID
 */
exports.deletePartner = async (req, res) => {
  try {
    const deleted = await Partner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Partner not found' });
    return res.json({ message: 'Partner deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete partner' });
  }
};
