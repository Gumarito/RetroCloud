const https = require('https');

https.get('https://cookieclicker.ee/', (res) => {
  console.log('Location:', res.headers.location);
});
