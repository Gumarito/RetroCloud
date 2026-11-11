const https = require('https');
const fs = require('fs');

https.get('https://wasm.rip/files/cuphead/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/cuphead_page.html', data);
    console.log('Cuphead page saved, length:', data.length);
    const alerts = data.match(/alert\([^)]+\)/g);
    console.log('Alert calls in page:', alerts);
  });
});
