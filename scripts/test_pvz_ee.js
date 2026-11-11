const https = require('https');

https.get('https://pvz.ee/iframe.php', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('pvz.ee status:', res.statusCode);
    console.log('pvz.ee headers:', res.headers);
    console.log('pvz.ee data length:', data.length);
    console.log(data.slice(0, 500));
  });
});
