const http = require('http');

const urls = [
  'http://localhost:3000/games/cuphead/index.html',
  'http://localhost:3000/games/celeste/index.html',
  'http://localhost:3000/games/cookie-clicker/index.html',
  'http://localhost:3000/admin',
  'http://localhost:3000/games.json'
];

urls.forEach(u => {
  http.get(u, res => {
    console.log(u, '=>', res.statusCode);
  }).on('error', e => console.error(u, '=>', e.message));
});
