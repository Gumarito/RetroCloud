const https = require('https');

async function testWsrv(rawUrl) {
  return new Promise((resolve) => {
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=400&output=webp`;
    https.get(proxyUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ status: res.statusCode, location: res.headers.location });
    }).on('error', err => resolve({ status: err.message }));
  });
}

async function run() {
  const testList = [
    'https://upload.wikimedia.org/wikipedia/en/9/9f/The_Simpsons_Hit_%26_Run_Cover.PNG',
    'https://upload.wikimedia.org/wikipedia/en/5/5a/Naruto_Shippuden_Ultimate_Ninja_5.jpg',
    'https://upload.wikimedia.org/wikipedia/en/1/14/Cookie_Clicker_logo.png',
    'https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.PNG',
    'https://upload.wikimedia.org/wikipedia/en/b/ba/Tekken_5_Coverart.png'
  ];

  for (const u of testList) {
    const r = await testWsrv(u);
    console.log(`${u.split('/').pop()} -> WSRV STATUS: ${r.status}`);
  }
}
run();
