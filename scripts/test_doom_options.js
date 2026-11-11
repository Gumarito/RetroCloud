const https = require('https');

async function test(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => r({ u, status: res.statusCode })).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const list = [
    'https://silveiraneto.github.io/doom-wasm/',
    'https://diek.net/doom/',
    'https://wasm.rip/files/doom/index.html',
    'https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos'
  ];
  for (const item of list) {
    console.log(await test(item));
  }
}
run();
