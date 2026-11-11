const https = require('https');
const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent('Diablo II video game')}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=600&format=json`;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('RESPONSE:', data.slice(0, 500));
  });
});
