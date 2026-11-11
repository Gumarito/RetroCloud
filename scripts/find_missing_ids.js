const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let m;
const missing = new Set();
const found = new Set();

while ((m = regex.exec(html)) !== null) {
  const id = m[1];
  const hasId = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  if (!hasId) {
    missing.add(id);
  } else {
    found.add(id);
  }
}

console.log('Missing IDs referenced in JS:');
console.log(Array.from(missing));
