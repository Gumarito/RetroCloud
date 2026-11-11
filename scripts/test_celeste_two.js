const https = require('https');

https.get('https://celeste.r58playz.dev/', res => {
  console.log('r58playz status:', res.statusCode);
  console.log('x-frame-options:', res.headers['x-frame-options']);
}).on('error', e => console.log('r58playz error:', e.message));

https.get('https://www.lexaloffle.com/bbs/widget.php?pid=celeste', res => {
  console.log('lexaloffle status:', res.statusCode);
  console.log('x-frame-options:', res.headers['x-frame-options']);
}).on('error', e => console.log('lexaloffle error:', e.message));
