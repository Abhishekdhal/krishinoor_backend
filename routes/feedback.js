const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Please enter all required fields' });
    }

    const newFeedback = new Feedback({ name, message });
    await newFeedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
