const https = require('https');

https.get('https://www.lexaloffle.com/bbs/widget.php?pid=celeste', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Snippet:', d.substring(0, 800));
  });
});
