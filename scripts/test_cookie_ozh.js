const https = require('https');

https.get('https://ozh.github.io/cookieclicker/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('cookieclicker ozh status:', res.statusCode);
    const hasWarning = data.includes("It looks like you're accessing Cookie Clicker");
    console.log('Has warning text in HTML:', hasWarning);
    const scripts = data.match(/<script[^>]*src="[^"]*"[^>]*>/g);
    console.log('Scripts:', scripts);
  });
});
