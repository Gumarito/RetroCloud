const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const idxOpen = lines.findIndex(l => l.includes('game.launchMode === "external"'));
console.log('idxOpen:', idxOpen);
for (let i = idxOpen; i < idxOpen + 35; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
