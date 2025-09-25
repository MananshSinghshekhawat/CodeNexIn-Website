const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// Create a job posting
router.post('/', careerController.createCareer);

// List job postings (pagination, filter, search)
router.get('/', careerController.getAllCareers);

// Get single job
router.get('/:id', careerController.getCareerById);

// Update job
router.put('/:id', careerController.updateCareer);

// Delete job (soft if ?soft=true)
router.delete('/:id', careerController.deleteCareer);

// Apply to job (save application)
router.post('/:id/apply', careerController.applyToCareer);

module.exports = router;
