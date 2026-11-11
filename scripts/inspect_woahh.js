const https = require('https');

https.get('https://woahhcrackers.github.io/CupheadWeb/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('woahhcrackers length:', data.length);
    console.log(data.slice(0, 1500));
  });
});
