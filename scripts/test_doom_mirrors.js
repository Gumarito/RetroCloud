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
  console.log(await test('https://joeheyming.github.io/doom/'));
  console.log(await test('https://ustymukhman.github.io/WebDOOM/public/'));
  console.log(await test('https://rgc.zone/ports/truedoom/index.html'));
  console.log(await test('https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos'));
}
run();
