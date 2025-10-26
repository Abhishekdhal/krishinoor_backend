// middleware/database.js
const mongoose = require('mongoose');

const connectDB = async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    return next();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = connectDB;
