const express = require('express');
const router = express.Router();
const {
  getContactInfo,
  submitContactForm,
  getContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  updateContactInfo,
  updateContactSubmission
} = require('../controllers/contactController');

// Public routes
router.get('/', getContactInfo);
router.post('/submit', submitContactForm);

// Admin routes - get all submissions
router.get('/submissions', getContactSubmissions);

// Admin routes - get single submission by ID
router.get('/submissions/:id', getContactSubmission);

// Admin routes - update submission status by ID
router.put('/submissions/:id/status', updateContactStatus);

// Admin routes - update contact information
router.put('/admin/info', updateContactInfo);
module.exports = router;
// Admin routes - update submission by ID (general update)
router.put('/submissions/:id', updateContactSubmission);

module.exports = router;