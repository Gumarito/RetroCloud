const https = require('https');

https.get('https://ozh.github.io/cookieclicker/main.js?v=13g', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf("another URL");
    console.log('Index of another URL in ozh main.js:', idx);
    if (idx > -1) {
      console.log(data.slice(idx - 100, idx + 200));
    }
  });
});
