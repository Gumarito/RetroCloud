const https = require('https');

https.get('https://pixelsuft.github.io/hl/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.slice(1500));
  });
});
