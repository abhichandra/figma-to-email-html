const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseFigmaData = require('../services/figmaParser');

router.get('/html', async (req, res) => {
  const { fileKey, nodeId } = req.query;

  if (!fileKey) return res.status(400).send("Missing fileKey");

  const fixedNodeId = nodeId?.replace('-', ':'); // ✅ Auto-fix
  const baseUrl = `https://api.figma.com/v1/files/${fileKey}`;
  const headers = {
    'X-Figma-Token': process.env.FIGMA_TOKEN
  };

  try {
    let documentData;

    if (fixedNodeId) {
      const response = await axios.get(`${baseUrl}/nodes?ids=${fixedNodeId}`, { headers });
      const nodeData = response.data.nodes[fixedNodeId];
      if (!nodeData || !nodeData.document) {
        return res.status(404).send("Node not found or invalid nodeId");
      }
      documentData = nodeData.document;
    } else {
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
