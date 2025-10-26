require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./middleware/database');
// Important: Mongoose MUST be imported to ensure models are registered
const mongoose = require('mongoose');

// Initialize the Express app
const app = express();

// Middleware
// Enable CORS for all routes and origins (for development/public APIs)
app.use(cors());
// Body parser: allows us to get data in req.body
app.use(express.json());

// Connect to database
app.use('/api', connectDB);

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Simple default route for health check
app.get('/', (req, res) => {
  // Check if Mongoose connection state is open (1)
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    message: ' Auth API is running',
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Vercel deployment requires the handler to be the Express app itself, 
// but we keep the listener for local development.

const PORT = process.env.PORT || 5000;

// Only listen on a port if not running in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server is running locally on port ${PORT}`));
}

// Export the app for Vercel/Serverless deployment
module.exports = app;