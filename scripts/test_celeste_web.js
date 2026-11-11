const https = require('https');

const testUrls = [
  'https://www.lexaloffle.com/bbs/widget.php?pid=celeste',
  'https://www.lexaloffle.com/bbs/cart_info.php?id=2145',
  'https://ccleste.lemuria.org/',
  'https://kometbomb.github.io/ccleste/',
  'https://lemon377.github.io/celeste-pico8/',
  'https://marcustyphoon.github.io/celeste/'
];

testUrls.forEach(u => {
  https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(u, res.statusCode, res.headers['x-frame-options'] || 'NO X-FRAME');
  }).on('error', e => console.log(u, e.message));
});
