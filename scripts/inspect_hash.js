const https = require('https');

https.get('https://pixelsuft.github.io/hl/xash.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const memIdx = data.indexOf('location.hash');
    console.log(data.slice(memIdx, memIdx + 300));
  });
});
