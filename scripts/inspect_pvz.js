const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('PvZ HTML length:', data.length);
    console.log(data.slice(0, 1000));
  });
});
