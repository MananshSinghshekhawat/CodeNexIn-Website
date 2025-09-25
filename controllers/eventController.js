const Event = require('../models/Event');

/**
 * Create a new event
 */
exports.createEvent = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;
    if (!title || !description || !eventDate) {
      return res.status(400).json({ message: 'title, description and eventDate are required' });
    }

    const newEvent = new Event(req.body);
    await newEvent.save();
    return res.status(201).json({ message: ' Event created successfully', data: newEvent });
  } catch (err) {
    console.error('createEvent error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create event' });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, from, to, upcoming } = req.query;
    const filter = {};

    // active only by default
    filter.isActive = true;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ];
    }

    if (from || to) {
      filter.eventDate = {};
      if (from) filter.eventDate.$gte = new Date(from);
      if (to) filter.eventDate.$lte = new Date(to);
    }

    if (upcoming === 'true') {
      const now = new Date();
      filter.eventDate = filter.eventDate || {};
      filter.eventDate.$gte = now;
    }

    const events = await Event.find(filter)
      .sort({ eventDate: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Event.countDocuments(filter);

    return res.json({
      data: events,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('getAllEvents error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch events' });
  }
};

/**
 * Get event by id
 */
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json(event);
  } catch (err) {
    console.error('getEventById error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch event' });
  }
};

/**
 * Update event by id
 */
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    return res.json({ message: 'Event updated successfully', data: updated });
  } catch (err) {
    console.error('updateEvent error:', err);
    return res.status(400).json({ error: err.message || 'Failed to update event' });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const { soft } = req.query;
    if (soft === 'true') {
      const updated = await Event.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!updated) return res.status(404).json({ message: 'Event not found' });
      return res.json({ message: 'Event soft-deleted (isActive=false)', data: updated });
    } else {
      const deleted = await Event.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Event not found' });
      return res.json({ message: 'Event permanently deleted' });
    }
  } catch (err) {
    console.error('deleteEvent error:', err);
    return res.status(500).json({ error: err.message || 'Failed to delete event' });
  }
};
