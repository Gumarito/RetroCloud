const https = require('https');

https.get('https://pixelsuft.github.io/hl/xash.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('function startXash');
    console.log(data.slice(idx, idx + 1800));
  });
});
