const https = require('https');

https.get('https://pvz.ee/iframe.php', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.slice(0, 1500));
  });
});
