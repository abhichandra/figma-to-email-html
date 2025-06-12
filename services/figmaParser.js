const { generateEmailTable } = require('../templates/emailTemplate');

function parseFigmaData(documentNode) {
  const elements = [];

  const walk = (node) => {
    if (node.type === 'TEXT' && node.characters) {
      const style = {
        fontSize: node.style?.fontSize || 14,
        fontWeight: node.style?.fontWeight || 400,
        textAlign: node.style?.textAlignHorizontal || 'left',
        color: getColor(node.fills?.[0])
      };
      elements.push({ type: 'text', content: node.characters, style });
    }
    if (node.type === 'RECTANGLE' && node.fills?.[0]?.type === 'IMAGE') {
      elements.push({ type: 'image', url: '[Image placeholder]' });
    }
    if (node.children) {
      node.children.forEach(walk);
    }
  };

  const getColor = (fill) => {
    if (!fill || !fill.color) return '#000000';
    const { r, g, b } = fill.color;
    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  };

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  walk(documentNode);
  return generateEmailTable(elements);
}

module.exports = parseFigmaData;
