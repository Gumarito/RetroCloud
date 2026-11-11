const https = require('https');

https.get('https://api.github.com/search/repositories?q=celeste+pico-8+language:html&sort=stars', {
  headers: { 'User-Agent': 'RetroCloud-Auditor' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const data = JSON.parse(d);
      if (data.items) {
        console.log('Found repos:', data.items.slice(0, 5).map(r => ({ full_name: r.full_name, html_url: r.html_url })));
      } else {
        console.log('Response:', d.substring(0, 200));
      }
    } catch(e) {
      console.log('Error parsing JSON');
    }
  });
}).on('error', e => console.log('Error:', e.message));
