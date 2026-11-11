const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('modalVolumeSlider') || line.includes('setGameVolume') || line.includes('initGameVolume')) {
    console.log(`${idx + 1}: ${line}`);
    for (let i = Math.max(0, idx - 2); i < Math.min(lines.length, idx + 25); i++) {
      console.log(`  ${i + 1}: ${lines[i]}`);
    }
  }
});
