const express = require('express');
const router = express.Router();
const { analyzeSentiment } = require('../services/sentimentService');

router.post('/sentiment', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Missing text' });

    const sentiment = await analyzeSentiment(text);
    res.json(sentiment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
