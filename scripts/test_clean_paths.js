const http = require('http');

['http://localhost:3000/games/cuphead/', 'http://localhost:3000/games/celeste/', 'http://localhost:3000/games/cookie-clicker/'].forEach(u => {
  http.get(u, res => console.log(u, '=>', res.statusCode)).on('error', e => console.log(e.message));
});
