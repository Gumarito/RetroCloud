const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const idxMirrors = lines.findIndex(l => l.includes('mirrorsList.innerHTML ='));
console.log('idxMirrors:', idxMirrors);
for (let i = idxMirrors - 2; i < idxMirrors + 30; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
