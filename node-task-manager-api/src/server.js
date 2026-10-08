const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Node.js Task Management REST API'
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found.`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Task Management REST API running on port ${env.PORT}`);
    console.log(`🌐 Healthcheck: http://localhost:${env.PORT}/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;
