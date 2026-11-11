const https = require('https');

https.get('https://www.lexaloffle.com/bbs/cposts/ce/celeste-3.p8.png', res => {
  console.log('Real cart status:', res.statusCode, res.headers['content-length']);
});
