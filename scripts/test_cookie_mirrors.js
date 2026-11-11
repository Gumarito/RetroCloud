const https = require('https');
const urls = [
  'https://cookieclicker.ee/',
  'https://orteil.dashnet.org/cookieclicker/',
  'https://ozh.github.io/cookieclicker/',
  'https://raw.githubusercontent.com/y8/cookie-clicker/master/index.html'
];

urls.forEach(u => {
  https.get(u, res => {
    let d = '';
    res.on('data', c => { if (d.length < 20000) d += c; });
    res.on('end', () => {
      console.log(u, res.statusCode, d.includes('Wrong address') ? 'HAS WRONG ADDRESS' : 'CLEAN');
    });
  }).on('error', e => console.log(u, e.message));
});
