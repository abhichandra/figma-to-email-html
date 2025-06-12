const express = require('express');
const path = require('path');
const app = express();
const figmaRoute = require('./routes/figma');

app.use(express.json());

// Serve frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/figma', figmaRoute);

// Optional: redirect unknown routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
