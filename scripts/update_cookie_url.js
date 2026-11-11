const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const cookie = games.find(g => g.id === 'cookie-clicker');
if (cookie) {
  cookie.url = './games/cookie-clicker/';
  cookie.launchMode = 'iframe';
  cookie.note = 'Versión local optimizada con supresión de bloqueos de dominio.';
  fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
  console.log('Updated cookie-clicker URL to ./games/cookie-clicker/');
}
