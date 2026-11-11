const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '..', 'games', 'minecraft-1-8-8');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

(async () => {
  const base = 'https://raw.githubusercontent.com/neon443/eaglercraftX188/main/';
  const files = ['index.html', 'assets.epk', 'classes.js'];

  for (const f of files) {
    const dest = path.join(dir, f);
    console.log(`Downloading ${f}...`);
    await downloadFile(base + f, dest);
    const size = (fs.statSync(dest).size / 1024 / 1024).toFixed(2);
    console.log(`Saved ${f} (${size} MB)`);
  }
  console.log('EaglercraftX downloaded successfully!');
})();
