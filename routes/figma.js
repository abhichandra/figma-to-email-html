const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseFigmaData = require('../services/figmaParser');

router.get('/html', async (req, res) => {
  const { fileKey, nodeId } = req.query;
  if (!fileKey) return res.status(400).send("Missing fileKey");

  const baseUrl = `https://api.figma.com/v1/files/${fileKey}`;
  const headers = {
    'X-Figma-Token': process.env.FIGMA_TOKEN
  };

  try {
    let documentData;

    if (nodeId) {
      // Fetch specific node
      const response = await axios.get(`${baseUrl}/nodes?ids=${nodeId}`, { headers });
      const nodeData = response.data.nodes[nodeId];
      if (!nodeData || !nodeData.document) {
        return res.status(404).send("Node not found or invalid nodeId");
      }
      documentData = nodeData.document;
    } else {
      // Fetch entire file
      const response = await axios.get(baseUrl, { headers });
      documentData = response.data.document;
    }

    const html = parseFigmaData(documentData);
    res.send(html);
  } catch (err) {
    res.status(500).send("Error fetching from Figma API: " + err.message);
  }
});

module.exports = router;
