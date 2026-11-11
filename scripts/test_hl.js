const https = require('https');

https.get('https://pixelsuft.github.io/hl/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HL length:', data.length);
    console.log(data.slice(0, 1500));
  });
});
