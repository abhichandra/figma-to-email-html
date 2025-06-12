require('dotenv').config();
const express = require('express');
const app = express();
const figmaRoute = require('./routes/figma');

app.use(express.json());
app.use('/figma', figmaRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
