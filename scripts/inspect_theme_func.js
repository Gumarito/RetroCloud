const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Head script ---');
for (let i = 350; i < 368; i++) console.log(`${i + 1}: ${lines[i]}`);

console.log('--- initTheme & updateThemeUI ---');
for (let i = 1655; i < 1680; i++) console.log(`${i + 1}: ${lines[i]}`);
