const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const idxLauncher = lines.findIndex(l => l.includes('id="externalLauncher"'));
console.log('idxLauncher:', idxLauncher);
for (let i = idxLauncher; i < idxLauncher + 50; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
