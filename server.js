require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/problem', require('./routes/problem'));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Auth API is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

module.exports = app;
