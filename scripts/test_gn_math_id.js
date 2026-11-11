const https = require('https');

https.get('https://gn-math.dev/?id=623', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }
}, res => {
  console.log('Status:', res.statusCode);
  console.log('Location:', res.headers.location);
  let d = '';
  res.on('data', c => { if (d.length < 15000) d += c; });
  res.on('end', () => {
    console.log('HTML snippet:', d.substring(0, 1000));
  });
});
