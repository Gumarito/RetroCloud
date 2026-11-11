const https = require('https');

https.get('https://api.github.com/repos/demilion/Celeste-Classic-PICO-8-Android/contents/app/src/main/assets', {
  headers: { 'User-Agent': 'RetroCloud-Auditor' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const data = JSON.parse(d);
      console.log('Files in assets:', data.map(f => f.name));
    } catch(e) {
      console.log('Error:', d.substring(0, 200));
    }
  });
});
