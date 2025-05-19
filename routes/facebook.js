const express = require('express');
const router = express.Router();
const { getLatestPosts } = require('../services/facebookService');

router.get('/posts', async (req, res) => {
  try {
    const posts = await getLatestPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
  }
});

module.exports = router;
