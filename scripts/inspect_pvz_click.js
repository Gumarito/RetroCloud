const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    scripts.forEach((s, i) => {
      if (s.includes('btn-play') || s.includes('btnPlay') || s.includes('startGame')) {
        console.log(`Script ${i}:`);
        console.log(s.slice(0, 1500));
      }
    });
  });
});
