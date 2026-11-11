const https = require('https');

https.get('https://vinmannie.github.io/Sonic-1-WASM/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Sonic status:', res.statusCode);
    console.log('Sonic data length:', data.length);
    console.log(data.slice(0, 1000));
  });
});
