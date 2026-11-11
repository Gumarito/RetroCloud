const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const cookie = games.find(g => g.id === 'cookie-clicker');
if (cookie) {
  cookie.note = '';
  fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
  console.log('Cleared cookie note');
}
