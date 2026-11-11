const https = require('https');

https.get('https://pixelsuft.github.io/hl/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    scripts.forEach((s, i) => {
      console.log(`Script ${i}:`, s.slice(0, 500));
    });
  });
});
