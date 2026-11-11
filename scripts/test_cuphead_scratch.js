const https = require('https');

async function test(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => r({ u, status: res.statusCode })).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const list = [
    'https://turbowarp.org/embed.html?project_url=https://scratch.mit.edu/projects/288461718',
    'https://cuphead.games/',
    'https://cuphead-online.github.io/'
  ];
  for (const item of list) {
    console.log(await test(item));
  }
}
run();
