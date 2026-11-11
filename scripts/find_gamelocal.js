const https = require('https');

https.get('https://ozh.github.io/cookieclicker/main.js?v=13g', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    let pos = 0;
    while ((pos = data.indexOf('Game.local', pos)) !== -1) {
      console.log('--- At pos', pos, '---');
      console.log(data.slice(Math.max(0, pos - 100), Math.min(data.length, pos + 100)));
      pos += 10;
    }
  });
});
