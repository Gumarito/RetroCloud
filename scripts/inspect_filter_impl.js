const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Lines 1375 to 1420 ---');
for (let i = 1375; i < Math.min(lines.length, 1420); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

console.log('--- Lines 1560 to 1600 ---');
for (let i = 1560; i < Math.min(lines.length, 1600); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
