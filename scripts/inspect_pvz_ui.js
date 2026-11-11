const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/pvz-ui.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('pvz-ui.js length:', data.length);
    console.log(data.slice(0, 1500));
  });
});
