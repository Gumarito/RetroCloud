const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('function changeLanguage(');
const endIdx = html.indexOf('function updateFilterButtons', startIdx);
const funcCode = html.substring(startIdx, endIdx);

const matches = [...funcCode.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]);
console.log('Total getElementById in changeLanguage:', matches.length);

const missing = [];
matches.forEach(id => {
  const needle = `id="${id}"`;
  if (!html.includes(needle)) {
    missing.push(id);
  }
});

console.log('MISSING IDs that cause crashes:', missing);
