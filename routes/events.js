const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Add new event
router.post('/add', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: '✅ Event created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all active events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ eventDate: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
