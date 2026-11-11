const https = require('https');

const candidates = [
  'https://raw.githubusercontent.com/3kh0/3kh0-Assets/main/celeste/index.html',
  'https://3kh0.github.io/ext-act/celeste/index.html',
  'https://raw.githubusercontent.com/skylight-app/games/main/celeste/index.html',
  'https://ozh.github.io/celeste/index.html',
  'https://raw.githubusercontent.com/mathsspot/mathsspot.github.io/main/celeste/index.html',
  'https://raw.githubusercontent.com/noelberry/celeste/master/celeste.html'
];

candidates.forEach(u => {
  https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(u, res.statusCode);
  }).on('error', e => console.log(u, e.message));
});
