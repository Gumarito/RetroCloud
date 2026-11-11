const https = require('https');

https.get('https://wasm.rip/files/gstrike/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('gstrike status:', res.statusCode);
    console.log('gstrike length:', data.length);
    console.log(data.slice(0, 1000));
  });
});
