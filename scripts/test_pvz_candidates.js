const https = require('https');

async function testUrl(url) {
  return new Promise(resolve => {
    try {
      const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
        resolve({ url, status: res.statusCode, headers: res.headers });
      });
      req.on('error', err => resolve({ url, error: err.message }));
      req.setTimeout(5000, () => { req.destroy(); resolve({ url, error: 'timeout' }); });
    } catch (e) {
      resolve({ url, error: e.message });
    }
  });
}

async function checkPvz() {
  const candidates = [
    'https://lmintlcx.github.io/pvz/',
    'https://solaldunckel.github.io/plants-vs-zombies/',
    'https://plantsvszombies.online/',
    'https://pvz.game-files.club/',
    'https://archive.org/embed/plants-vs.-zombies-game-of-the-year-edition'
  ];
  for (const c of candidates) {
    const res = await testUrl(c);
    console.log(c, '=>', res.status || res.error);
  }
}

checkPvz();
