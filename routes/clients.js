const express = require('express');
const router = express.Router();
const { getClients, createClient } = require('../controllers/clientController');

// Public routes
router.get('/', getClients);
router.post('/', createClient);

module.exports = router;