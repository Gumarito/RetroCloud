const https = require('https');
const http = require('http');

function fetchContent(urlStr, maxLen = 1000) {
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const client = u.protocol === 'https:' ? https : http;
      const req = client.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        let data = '';
        res.on('data', chunk => {
          if (data.length < maxLen) data += chunk.toString();
        });
        res.on('end', () => resolve({ status: res.statusCode, data: data.slice(0, maxLen), headers: res.headers }));
      });
      req.on('error', err => resolve({ error: err.message }));
      req.setTimeout(6000, () => {
        req.destroy();
        resolve({ error: 'Timeout' });
      });
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

async function run() {
  console.log('Testing Cuphead...');
  const cup = await fetchContent('https://wasm.rip/files/cuphead/index.html', 800);
  console.log('Cuphead:', cup.status, cup.data ? cup.data.slice(0, 300) : cup.error);

  console.log('\nTesting Half-Life...');
  const hl = await fetchContent('https://pixelsuft.github.io/hl/', 800);
  console.log('Half-Life:', hl.status, hl.data ? hl.data.slice(0, 300) : hl.error);

  console.log('\nTesting PvZ...');
  const pvz = await fetchContent('https://rgc.zone/ports/pvzweb/index.html', 800);
  console.log('PvZ:', pvz.status, pvz.data ? pvz.data.slice(0, 300) : pvz.error);

  console.log('\nTesting Tetris chvin...');
  const tet = await fetchContent('https://chvin.github.io/react-tetris/', 800);
  console.log('Tetris:', tet.status, tet.data ? tet.data.slice(0, 300) : tet.error);
}

run();
