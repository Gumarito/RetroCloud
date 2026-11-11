const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const idxNote = lines.findIndex(l => l.includes('game.note ?'));
console.log('idxNote:', idxNote);
if (idxNote > -1) {
  for (let i = idxNote - 3; i < idxNote + 6; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
