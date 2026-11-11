const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

for (let i = 3014; i < 3060; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
