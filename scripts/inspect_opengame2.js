const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

for (let i = 2080; i < 2160; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
