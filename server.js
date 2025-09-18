const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codenexin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Import routes
const homeRoutes = require('./routes/home');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blogs');
const clientRoutes = require('./routes/clients');
const aboutRoutes = require('./routes/about');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
<<<<<<< HEAD
const portfolioRoutes = require('./routes/portfolio');
const dashboardRoutes = require('./routes/dashboard'); // Add this line
const authRoutes = require('./routes/auth'); // Add if you have auth routes
=======
const portfolioRoutes = require('./routes/portfolio'); 
>>>>>>> 9c68837354d7d790ee5512064e51bcda82a315d6

// Routes
app.use('/api/home', homeRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
<<<<<<< HEAD
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/dashboard', dashboardRoutes); // Add this line
app.use('/api/auth', authRoutes); // Add if you have auth routes
=======
app.use('/api/portfolio', portfolioRoutes); 
>>>>>>> 9c68837354d7d790ee5512064e51bcda82a315d6

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 CodeNexIn Backend is running!',
    version: '1.0.0',
    status: 'OK',
    endpoints: {
      home: '/api/home',
      about: '/api/about',
      services: '/api/services',
      contact: '/api/contact',
      testimonials: '/api/testimonials',
      blogs: '/api/blogs',
      clients: '/api/clients',
      portfolio: '/api/portfolio',
      dashboard: '/api/dashboard' // Add this line
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
  console.log(` About API: http://localhost:${PORT}/api/about`);
  console.log(` Services API: http://localhost:${PORT}/api/services`);
  console.log(` Portfolio API: http://localhost:${PORT}/api/portfolio`);
  console.log(` Dashboard API: http://localhost:${PORT}/api/dashboard`); // Add this line
  console.log(` Health: http://localhost:${PORT}/health`);
  console.log(' ========================================\n');
});
