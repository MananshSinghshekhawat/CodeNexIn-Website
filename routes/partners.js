const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

// Create Partner
router.post('/', partnerController.createPartner);

// Get all Partners (supports ?page=&limit=&q=)
router.get('/', partnerController.getAllPartners);

// Get Partner by ID
router.get('/:id', partnerController.getPartnerById);

// Update Partner
router.put('/:id', partnerController.updatePartner);

// Delete Partner
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
