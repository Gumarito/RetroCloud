const https = require('https');

https.get('https://ozh.github.io/cookieclicker/index.html', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    let pos = 0;
    while ((pos = data.indexOf('LOCAL', pos)) !== -1) {
      console.log('--- At pos in index.html', pos, '---');
      console.log(data.slice(Math.max(0, pos - 50), Math.min(data.length, pos + 80)));
      pos += 5;
    }
  });
});
