const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    console.log('Total scripts:', scripts.length);
    scripts.forEach((s, i) => {
      console.log(`Script ${i} length: ${s.length}`);
      if (s.length > 500) {
        console.log(s.slice(0, 400));
        console.log('...');
        console.log(s.slice(s.length - 400));
      }
    });
  });
});
