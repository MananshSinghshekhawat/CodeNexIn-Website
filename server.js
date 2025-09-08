const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codenexin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api/home', require('./routes/home'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/about', require('./routes/about'));
app.use('/api/services', require('./routes/services'));
// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 CodeNexIn Backend is running!',
    version: '1.0.0',
    status: 'OK',
    endpoints: {
      home: '/api/home',
      testimonials: '/api/testimonials',
      blogs: '/api/blogs',
      clients: '/api/clients'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is healthy ✅',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n✨ ========================================');
  console.log(' CodeNexIn Backend Server Started');
  console.log(' ========================================');
  console.log(` Local: http://localhost:${PORT}`);
  console.log(` Home API: http://localhost:${PORT}/api/home`);
  console.log(` Health: http://localhost:${PORT}/health`);
  console.log(' ========================================\n');
});
