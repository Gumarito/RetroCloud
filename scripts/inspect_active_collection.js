const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Where activeCollection is used ---');
lines.forEach((line, idx) => {
  if (line.includes('activeCollection')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
