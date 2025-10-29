const express = require('express');
const router = express.Router();
const multer = require('multer');
const Problem = require('../models/Problem');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { text, imageUrl: providedUrl } = req.body;

    const imageUrl = req.file ? req.file.path : providedUrl;

    if (!text || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide text and an image or image URL' });
    }

    const newProblem = new Problem({ text, imageUrl });
    await newProblem.save();

    res.status(201).json({
      success: true,
      message: 'Problem submitted successfully',
      problem: newProblem
    });
  } catch (error) {
    console.error('Problem Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
