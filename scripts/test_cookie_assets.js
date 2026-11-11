const https = require('https');

https.get('https://ozh.github.io/cookieclicker/base64.js', res => {
  console.log('ozh base64 status:', res.statusCode);
});
https.get('https://ozh.github.io/cookieclicker/main.js?v=13g', res => {
  console.log('ozh main.js status:', res.statusCode);
});
