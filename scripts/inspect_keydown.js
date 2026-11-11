const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes("addEventListener('keydown'") || line.includes('addEventListener("keydown"')) {
    console.log(`${idx + 1}: ${line}`);
    for (let i = Math.max(0, idx - 1); i < Math.min(lines.length, idx + 15); i++) {
      console.log(`  ${i + 1}: ${lines[i]}`);
    }
  }
});
