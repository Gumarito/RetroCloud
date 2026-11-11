const http = require('http');

['http://localhost:3000/games/half-life/', 'http://localhost:3000/games/cookie-clicker/'].forEach(u => {
  http.get(u, res => {
    console.log(u, '=>', res.statusCode);
  }).on('error', e => console.log(e.message));
});
