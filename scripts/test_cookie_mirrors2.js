const https = require('https');

async function test(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => { if (data.length < 5000) data += c; });
      res.on('end', () => {
        const hasWarning = data.includes("Wrong address") || data.includes("another URL");
        r({ u, status: res.statusCode, hasWarning });
      });
    }).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const mirrors = [
    'https://cookieclicker.ee/',
    'https://orteil.dashnet.org/cookieclicker/',
    'https://sheeptester.github.io/words-go-here/cookieclicker/classic/',
    'https://cookie-clicker.co/'
  ];
  for (const m of mirrors) {
    console.log(await test(m));
  }
}
run();
