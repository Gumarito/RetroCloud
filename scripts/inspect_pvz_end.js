const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    [6, 7, 8].forEach(i => console.log(`Script ${i}:`, scripts[i]));
  });
});
