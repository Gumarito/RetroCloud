const https = require('https');

https.get('https://pvz.ee/iframe.php', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.slice(2000, 4000));
  });
});
