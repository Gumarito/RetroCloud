const https = require('https');

https.get('https://wasmarcade.com/assets/minecraft-BeVEGfqN.js', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Length:', d.length);
    console.log('Snippet:', d.slice(0, 1500));
    const urls = d.match(/https?:\/\/[^"'\s>]+/g);
    console.log('URLs:', urls);
  });
});
