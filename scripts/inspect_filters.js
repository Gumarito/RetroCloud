const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Filter elements in HTML ---');
lines.forEach((line, idx) => {
  if (line.includes('id="gameFilters"') || line.includes('renderFilters') || line.includes('filterByCategory') || line.includes('Elige tu estilo') || line.includes('activeFilter')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
