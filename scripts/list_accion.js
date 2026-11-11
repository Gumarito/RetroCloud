const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const acc = games.filter(g => g.category === 'Acción');
console.log('Sample of Acción games:', acc.slice(0, 30).map(g => `[${g.id}] ${g.title}`));
