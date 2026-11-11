const https = require('https');

https.get('https://www.lexaloffle.com/bbs/cposts/0/celeste-3.p8.png', res => {
  console.log('Cart status:', res.statusCode, res.headers['content-type'], res.headers['content-length']);
});
