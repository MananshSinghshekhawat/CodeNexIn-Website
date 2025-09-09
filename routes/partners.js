const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// Create Partner
router.post('/', async (req, res) => {
    try {
        const partner = new Partner(req.body);
        await partner.save();
        res.status(201).json(partner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Partners
router.get('/', async (req, res) => {
    try {
        const partners = await Partner.find();
        res.json(partners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Partner by ID
router.get('/:id', async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.json(partner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Partner
router.put('/:id', async (req, res) => {
    try {
        const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.json(partner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Partner
router.delete('/:id', async (req, res) => {
    try {
        const partner = await Partner.findByIdAndDelete(req.params.id);
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.json({ message: 'Partner deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

