const https = require('https');

https.get('https://plantsvszombies.online/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('Data sample:', data.slice(0, 1000));
  });
});
