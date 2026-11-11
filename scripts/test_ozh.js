const https = require('https');
https.get('https://ozh.github.io/cookieclicker/', res => {
  console.log('ozh status:', res.statusCode);
  console.log('x-frame-options:', res.headers['x-frame-options']);
  console.log('csp:', res.headers['content-security-policy']);
  let d = '';
  res.on('data', c => { if (d.length < 5000) d += c; });
  res.on('end', () => {
    console.log('Title/content snippet:', d.substring(0, 400));
  });
}).on('error', e => console.log('error:', e.message));
