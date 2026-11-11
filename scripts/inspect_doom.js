const https = require('https');

https.get('https://raz0red.github.io/webprboom/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('webprboom length:', data.length);
    console.log(data.slice(0, 1500));
  });
});
