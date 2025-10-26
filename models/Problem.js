const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
