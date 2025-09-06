const Client = require('../models/Client');

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const { featured, limit } = req.query;
    let query = { isActive: true };
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const clients = await Client.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit) || 12);
    
    res.json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message
    });
  }
};

// Create new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    
    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating client',
      error: error.message
    });
  }
};