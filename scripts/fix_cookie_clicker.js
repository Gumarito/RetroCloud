const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const cookie = games.find(g => g.id === 'cookie-clicker');
if (cookie) {
  cookie.url = 'https://ozh.github.io/cookieclicker/';
  cookie.launchMode = 'iframe';
  cookie.mirrors = [
    {
      name: 'RetroCloud Motor Web (v2.058 Sin Bloqueo)',
      url: 'https://ozh.github.io/cookieclicker/'
    },
    {
      name: 'Sitio Oficial de Orteil (Requiere pestaña externa)',
      url: 'https://orteil.dashnet.org/cookieclicker/'
    }
  ];
  fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
  console.log('Successfully updated cookie-clicker to clean unblocked v2.058 mirror!');
} else {
  console.log('Cookie clicker not found in games.json');
}
