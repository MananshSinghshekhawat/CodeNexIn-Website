const Contact = require('../models/Contact');
const ContactInfo = require('../models/ContactInfo');

// Get contact information
exports.getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.getContactInfo();

    // Default contact information
    const defaultInfo = {
      companyName: "CodeNexIn",
      email: "hello@codenexin.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "123 Tech Street, Suite 456",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA"
      },
      businessHours: {
        mondayToFriday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed",
        timezone: "PST"
      },
      emergencySupport: {
        available: true,
        description: "For urgent technical support or critical issues, our emergency support team is available 24/7.",
        contact: "+1 (555) EMERGENCY"
      },
      socialMedia: {
        linkedin: "https://linkedin.com/company/codenexin",
        twitter: "https://twitter.com/codenexin",
        github: "https://github.com/codenexin",
        facebook: "https://facebook.com/codenexin"
      },
      responseTime: "24 hours"
    };

    res.json({
      success: true,
      data: contactInfo || defaultInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact information',
      error: error.message
    });
  }
};

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      projectType,
      projectBudget,
      projectDescription,
      urgency
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !projectType || !projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Create new contact submission
    const contactSubmission = new Contact({
      firstName,
      lastName,
      email,
      company,
      phone,
      projectType,
      projectBudget,
      projectDescription,
      urgency,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contactSubmission.save();

    // Here you would typically send an email notification
    // await sendContactEmail(contactSubmission);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contactSubmission._id,
        submittedAt: contactSubmission.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// Get all contact submissions (admin only)
exports.getContactSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const submissions = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: submissions,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submissions',
      error: error.message
    });
  }
};

// Get single contact submission (admin only)
exports.getContactSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Contact.findById(id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submission',
      error: error.message
    });
  }
};

// Update contact submission status (admin only)
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const submission = await Contact.findById(id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    if (status) {
      submission.status = status;
    }

    if (notes) {
      submission.notes.push({
        content: notes,
        addedBy: 'Admin'
      });
    }

    await submission.save();

    res.json({
      success: true,
      message: 'Contact submission updated successfully',
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact submission',
      error: error.message
    });
  }
};

// Update contact information (admin only)
exports.updateContactInfo = async (req, res) => {
  try {
    const updates = req.body;
    
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      contactInfo = new ContactInfo(updates);
    } else {
      Object.keys(updates).forEach(key => {
        contactInfo[key] = updates[key];
      });
    }
    
    contactInfo.lastUpdated = new Date();
    await contactInfo.save();
    
    res.json({
      success: true,
      message: 'Contact information updated successfully',
      data: contactInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact information',
      error: error.message
    });
  }
};