const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const playListener = data.indexOf('btn-play');
    if (playListener > -1) {
      console.log(data.slice(playListener, playListener + 1200));
    }
  });
});
