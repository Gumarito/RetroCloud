const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const dosZoneGames = games.filter(g => (g.url && g.url.includes('dos.zone')) || (g.mirrors && g.mirrors.some(m => m.url && m.url.includes('dos.zone'))));
console.log('Games using dos.zone:', dosZoneGames.map(g => ({ id: g.id, title: g.title, url: g.url, launchMode: g.launchMode })));
