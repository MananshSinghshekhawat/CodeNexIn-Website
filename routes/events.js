// routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create event
router.post('/', eventController.createEvent);

// Get all active events (supports query params page/limit/q/from/to/upcoming)
router.get('/', eventController.getAllEvents);

// Get event by id
router.get('/:id', eventController.getEventById);

// Update event
router.put('/:id', eventController.updateEvent);

// Delete event (soft delete with ?soft=true or hard delete)
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
