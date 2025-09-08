const express = require('express');
const router = express.Router();
const {
  getContactInfo,
  submitContactForm,
  getContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  updateContactInfo
} = require('../controllers/contactController');

// Public routes
router.get('/', getContactInfo);
router.post('/submit', submitContactForm);

// Admin routes
router.get('/submissions', getContactSubmissions);
router.get('/submissions/:id', getContactSubmission);
router.put('/submissions/:id', updateContactStatus);
router.put('/admin', updateContactInfo);

module.exports = router;