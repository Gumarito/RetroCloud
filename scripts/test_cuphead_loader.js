const https = require('https');

https.get('https://raw.githubusercontent.com/woahhcrackers/CupheadWeb/main/Build/Cuphead.loader.js', (res) => {
  console.log('Loader status:', res.statusCode);
});
