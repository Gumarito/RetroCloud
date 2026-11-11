const https = require('https');

async function test(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => { if (data.length < 5000) data += c; });
      res.on('end', () => r({ u, status: res.statusCode, len: data.length }));
    }).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const list = [
    'https://cuphead.ee/',
    'https://cuphead.online/',
    'https://cupheadgame.github.io/',
    'https://woahhcrackers.github.io/CupheadWeb/',
    'https://wasm.rip/files/cuphead/index.html',
    'https://archive.org/embed/cuphead-web'
  ];
  for (const item of list) {
    console.log(await test(item));
  }
}
run();
