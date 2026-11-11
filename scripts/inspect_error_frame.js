const https = require('https');

https.get('https://ozh.github.io/cookieclicker/main.js?v=13g', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const idx = data.indexOf('Game.ErrorFrame');
    console.log(data.slice(idx - 200, idx + 400));
  });
});
