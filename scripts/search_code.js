const https = require('https');

https.get('https://api.github.com/search/code?q=filename:celeste.js+pico8', {
  headers: { 'User-Agent': 'RetroCloud-Auditor' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const data = JSON.parse(d);
      if (data.items) {
        console.log('Found code files:', data.items.slice(0, 5).map(i => ({ path: i.path, repo: i.repository.full_name })));
      } else {
        console.log('Code response:', d.substring(0, 200));
      }
    } catch(e) {
      console.log('Error parsing');
    }
  });
});
