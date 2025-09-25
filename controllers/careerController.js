const Career = require('../models/Career');


exports.createCareer = async (req, res) => {
  try {
    const payload = req.body;
    const career = new Career(payload);
    await career.save();
    return res.status(201).json({ message: 'Career created', data: career });
  } catch (err) {
    console.error('createCareer error:', err);
    return res.status(400).json({ message: err.message || 'Failed to create career' });
  }
};


exports.getAllCareers = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, employment_type, experience_level, active } = req.query;
    const filter = {};

  
    if (typeof active !== 'undefined') filter.isActive = active === 'true';
    else filter.isActive = true;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { requirements: { $regex: q, $options: 'i' } }
      ];
    }

    if (employment_type) filter.employment_type = employment_type;
    if (experience_level) filter.experience_level = experience_level;

    const careers = await Career.find(filter)
      .sort({ posted_date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Career.countDocuments(filter);
    return res.json({
      data: careers,
      meta: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error('getAllCareers error:', err);
    return res.status(500).json({ message: err.message || 'Failed to fetch careers' });
  }
};

/**
 * Get career by id
 */
exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    return res.json(career);
  } catch (err) {
    console.error('getCareerById error:', err);
    return res.status(500).json({ message: err.message || 'Failed to fetch career' });
  }
};

/**
 * Update career
 */
exports.updateCareer = async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Career not found' });
    return res.json({ message: 'Career updated', data: updated });
  } catch (err) {
    console.error('updateCareer error:', err);
    return res.status(400).json({ message: err.message || 'Failed to update career' });
  }
};

/**
 * Delete career (soft/hard)
 */
exports.deleteCareer = async (req, res) => {
  try {
    const { soft } = req.query;
    if (soft === 'true') {
      const updated = await Career.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!updated) return res.status(404).json({ message: 'Career not found' });
      return res.json({ message: 'Career soft-deleted', data: updated });
    } else {
      const deleted = await Career.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Career not found' });
      return res.json({ message: 'Career permanently deleted' });
    }
  } catch (err) {
    console.error('deleteCareer error:', err);
    return res.status(500).json({ message: err.message || 'Failed to delete career' });
  }
};


exports.applyToCareer = async (req, res) => {
  try {
    const careerId = req.params.id;
    const { name, email, resumeUrl, message } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'name and email are required' });

    const career = await Career.findById(careerId);
    if (!career) return res.status(404).json({ message: 'Career not found' });

    const application = { name, email, resumeUrl, message, appliedAt: new Date() };
    career.applications.push(application);
    await career.save();


    return res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    console.error('applyToCareer error:', err);
    return res.status(500).json({ message: err.message || 'Failed to submit application' });
  }
};
