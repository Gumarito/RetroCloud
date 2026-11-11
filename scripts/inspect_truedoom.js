const https = require('https');

https.get('https://rgc.zone/ports/truedoom/index.html', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log('truedoom:\n', data.slice(0, 1000)));
});
