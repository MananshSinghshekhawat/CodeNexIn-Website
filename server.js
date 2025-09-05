const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeNexIn Backend is running!',
    version: '1.0.0',
    status: 'OK'
  });
});


app.get('/health', (req, res) => {
  res.json({ status: 'Server is healthy' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});