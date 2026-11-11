const https = require('https');

async function test(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => r({ u, status: res.statusCode })).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const list = [
    'https://lemarier.github.io/celeste-classic-html5/',
    'https://neohan.github.io/celeste-classic/',
    'https://kristian-p.github.io/celeste-classic/',
    'https://celeste-classic.github.io/'
  ];
  for (const item of list) {
    console.log(await test(item));
  }
}
run();
