const https = require('https');

https.get('https://ozh.github.io/cookieclicker/main.js?v=13g', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf("another URL");
    console.log(data.slice(idx - 300, idx + 100));
  });
});
