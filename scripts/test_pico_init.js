const https = require('https');

https.get('https://www.lexaloffle.com/bbs/widget.php?pid=celeste', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const idx = data.indexOf('pico8_0207.js');
    console.log(data.slice(Math.max(0, idx - 500), Math.min(data.length, idx + 1000)));
  });
});
