const https = require('https');

https.get('https://www.lexaloffle.com/bbs/thumbs/pico8_celeste-3.png', res => {
  console.log('Thumb cart status:', res.statusCode, res.headers['content-type'], res.headers['content-length']);
});
