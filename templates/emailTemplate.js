function generateEmailTable(components) {
  let rows = components.map(comp => {
    if (comp.type === 'text') {
      const style = comp.style || {};
      return \`<tr><td style="
        font-size: \${style.fontSize}px;
        font-weight: \${style.fontWeight};
        text-align: \${style.textAlign};
        color: \${style.color};
        font-family: Arial, sans-serif;
      ">\${comp.content}</td></tr>\`;
    }
    if (comp.type === 'image') {
      return \`<tr><td><img src="\${comp.url}" width="100%" style="display:block;" /></td></tr>\`;
    }
    return '';
  }).join('\n');

  return \`
  <!DOCTYPE html>
  <html>
  <body>
    <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; width:100%;">
      \${rows}
    </table>
  </body>
  </html>\`;
}

module.exports = { generateEmailTable };
