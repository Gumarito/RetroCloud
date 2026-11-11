const https = require('https');
const http = require('http');

const urls = {
  'minecraft-1-8-8': 'https://wasmarcade.com/og/minecraft.jpg',
  'simpsons-hit-and-run': 'https://upload.wikimedia.org/wikipedia/en/9/9f/The_Simpsons_Hit_%26_Run_Cover.PNG',
  'super-mario-64': 'https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg',
  'naruto-shippuden-ultimate-ninja-5': 'https://upload.wikimedia.org/wikipedia/en/5/5a/Naruto_Shippuden_Ultimate_Ninja_5.jpg',
  'cookie-clicker': 'https://upload.wikimedia.org/wikipedia/en/1/14/Cookie_Clicker_logo.png',
  'geometry-dash': 'https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.PNG',
  'hollow-knight': 'https://upload.wikimedia.org/wikipedia/en/0/04/Hollow_Knight_first_cover_art.webp',
  'tekken-5': 'https://upload.wikimedia.org/wikipedia/en/b/ba/Tekken_5_Coverart.png'
};

async function checkUrl(name, url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      resolve({ name, url, status: res.statusCode });
    }).on('error', (err) => resolve({ name, url, status: 'ERROR: ' + err.message }));
  });
}

async function run() {
  for (const [name, u] of Object.entries(urls)) {
    const res = await checkUrl(name, u);
    console.log(`${res.name}: HTTP ${res.status} (${res.url})`);
  }
}
run();
