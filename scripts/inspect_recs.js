const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('renderModalRecommendations') || line.includes('modalRecList')) {
    console.log(`${idx + 1}: ${line}`);
    for (let i = Math.max(0, idx - 2); i < Math.min(lines.length, idx + 40); i++) {
      console.log(`  ${i + 1}: ${lines[i]}`);
    }
  }
});
