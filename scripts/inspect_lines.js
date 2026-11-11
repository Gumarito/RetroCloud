const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Theme matches ---');
lines.forEach((line, idx) => {
  if (line.includes('toggleTheme') || line.includes('prefers-color-scheme') || line.includes('setTheme')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});

console.log('--- Continuar jugando lines ---');
lines.forEach((line, idx) => {
  if (line.includes('Continuar jugando')) {
    console.log(`${idx + 1}: ${line}`);
    for (let i = Math.max(0, idx - 5); i < Math.min(lines.length, idx + 25); i++) {
      console.log(`  ${i + 1}: ${lines[i]}`);
    }
  }
});
