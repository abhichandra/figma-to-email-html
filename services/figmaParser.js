const { generateEmailTable } = require('../templates/emailTemplate');

function parseFigmaData(documentNode) {
  const body = [];

  const walk = (node) => {
    if (node.type === 'TEXT' && node.characters) {
      body.push({ type: 'text', content: node.characters });
    }
    if (node.type === 'RECTANGLE' && node.fills?.[0]?.type === 'IMAGE') {
      body.push({ type: 'image', url: '[Image placeholder]' });
    }
    if (node.children) {
      node.children.forEach(walk);
    }
  };

  walk(documentNode);
  return generateEmailTable(body);
}

module.exports = parseFigmaData;
