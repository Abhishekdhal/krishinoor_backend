const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  language: { type: String, default: 'en' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
