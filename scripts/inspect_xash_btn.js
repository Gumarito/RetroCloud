const https = require('https');

https.get('https://pixelsuft.github.io/hl/xash.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('Launch Xash3D');
    console.log('Index of Launch Xash3D:', idx);
    if (idx > -1) {
      console.log(data.slice(idx - 300, idx + 400));
    }
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    console.log('Total scripts in xash.html:', scripts.length);
    scripts.forEach((s, i) => {
      if (s.includes('startXash') || s.includes('Launch') || s.includes('location.hash')) {
        console.log(`Script ${i}:`);
        console.log(s.slice(0, 500));
      }
    });
  });
});
