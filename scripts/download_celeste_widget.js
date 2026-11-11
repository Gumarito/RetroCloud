const https = require('https');
const fs = require('fs');

https.get('https://www.lexaloffle.com/bbs/widget.php?pid=celeste', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/celeste_widget.html', d);
    console.log('Saved celeste_widget.html. Size:', d.length);
  });
});
