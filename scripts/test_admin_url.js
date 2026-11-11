const http = require('http');

function get(path) {
  return new Promise(resolve => {
    http.get('http://localhost:3000' + path, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        resolve({ status: res.statusCode, location: res.headers.location, bodyLen: d.length });
      });
    });
  });
}

async function test() {
  console.log('GET / :', await get('/'));
  console.log('GET /admin :', await get('/admin'));
}

test();
