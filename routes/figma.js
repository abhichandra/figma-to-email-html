const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseFigmaData = require('../services/figmaParser');

router.get('/html', async (req, res) => {
  const { fileKey } = req.query;
  if (!fileKey) return res.status(400).send("fileKey required");

  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_TOKEN
      }
    });

    const html = parseFigmaData(response.data.document);
    res.send(html);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
