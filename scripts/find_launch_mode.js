const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const lines = html.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('launchMode') || l.includes('external-modal') || l.includes('openExternal')) {
    console.log(`${idx + 1}: ${l.trim().slice(0, 100)}`);
  }
});
