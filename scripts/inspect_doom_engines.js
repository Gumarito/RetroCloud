const https = require('https');

https.get('https://joeheyming.github.io/doom/', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log('joeheyming:\n', data.slice(0, 1000)));
});

https.get('https://ustymukhman.github.io/WebDOOM/public/', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => console.log('ustymukhman:\n', data.slice(0, 1000)));
});
