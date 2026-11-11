const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('alphabetJumpList exists:', html.includes('id="alphabetJumpList"'));
console.log('recentlyPlayedList exists:', html.includes('id="recentlyPlayedList"'));
console.log('modalRecList exists:', html.includes('id="modalRecList"'));
console.log('gamesGrid exists:', html.includes('id="gamesGrid"'));
console.log('resultsCountBadge exists:', html.includes('id="resultsCountBadge"'));
