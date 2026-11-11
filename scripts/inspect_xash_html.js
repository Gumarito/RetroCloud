const https = require('https');

https.get('https://pixelsuft.github.io/hl/xash.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('xash.html length:', data.length);
    console.log(data.slice(0, 2000));
  });
});
