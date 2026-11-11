const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Lines 350 to 390 ---');
for (let i = 350; i < 390; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

console.log('--- Lines 1665 to 1715 ---');
for (let i = 1665; i < Math.min(lines.length, 1715); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
