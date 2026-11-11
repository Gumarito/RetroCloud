const https = require('https');

function testUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        resolve({ url, status: res.statusCode, headers: res.headers });
      });
      req.on('error', (err) => resolve({ url, error: err.message }));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({ url, error: 'Timeout' });
      });
    } catch (e) {
      resolve({ url, error: e.message });
    }
  });
}

async function check() {
  const urls = [
    'https://tekken5.online/',
    'https://tekken4.online/',
    'https://tkdr-recomp.pages.dev/',
    'https://narutoshippuden5.online/',
    'https://narutoimpact.online/',
    'https://wasm.rip/files/cuphead/index.html',
    'https://rgc.zone/ports/pvzweb/index.html',
    'https://csjs.live',
    'https://raz0red.github.io/webprboom/'
  ];
  for (const u of urls) {
    const res = await testUrl(u);
    console.log(u, '=>', res.status || res.error);
    if (res.headers && res.headers['x-frame-options']) {
      console.log('  x-frame-options:', res.headers['x-frame-options']);
    }
  }
}

check();
