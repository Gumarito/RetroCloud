const https = require('https');

https.get('https://woahhcrackers.github.io/CupheadWeb/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    scripts.forEach((s, i) => {
      console.log(`Script ${i}:`);
      console.log(s);
    });
  });
});
