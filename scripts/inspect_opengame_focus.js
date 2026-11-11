const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Searching openGame iframe focus ---');
lines.forEach((line, idx) => {
  if (line.includes('function openGame') || line.includes('gameFrame.src =') || line.includes('gameFrame.onload') || line.includes('focus()')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
