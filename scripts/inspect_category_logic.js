const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('--- Lines 430 to 480 ---');
for (let i = 430; i < 480; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

console.log('--- Lines where gameFilters or filterGames or category is defined in JS ---');
lines.forEach((line, idx) => {
  if (idx > 700 && (line.includes('gameFilters') || line.includes('currentCategory') || line.includes('filterTag') || line.includes('selectedCategory') || line.includes('filterByCategory'))) {
    console.log(`${idx + 1}: ${line}`);
  }
});
