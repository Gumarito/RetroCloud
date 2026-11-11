const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const idxModal = lines.findIndex(l => l.includes('id="gameModal"'));
console.log('idxModal:', idxModal);
for (let i = idxModal; i < idxModal + 90; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
