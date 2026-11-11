const https = require('https');

async function test(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => r({ u, status: res.statusCode })).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const list = [
    'https://tetris.deloskiyyt.pl/',
    'https://tetris.jcw7.com/',
    'https://dionyziz.github.io/canvas-tetris/',
    'https://harddrop.com/'
  ];
  for (const item of list) {
    console.log(await test(item));
  }
}
run();
