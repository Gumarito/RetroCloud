const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const dz = games.find(g => g.id === 'dos-zone');
console.log(dz);
