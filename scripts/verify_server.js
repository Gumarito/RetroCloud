const http = require('http');

http.get('http://localhost:3000/', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Homepage HTTP Status:', res.statusCode);
    console.log('featuredGameRanks declared:', data.includes('const featuredGameRanks = new Map'));
    console.log('setElemText declared:', data.includes('function setElemText'));
    console.log('initRetroCloudApp declared:', data.includes('function initRetroCloudApp'));
    console.log('mirrorsLabel present in HTML:', data.includes('id="mirrorsLabel"'));
  });
});

http.get('http://localhost:3000/admin', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Admin HTTP Status:', res.statusCode);
    console.log('Admin has Likes Reales:', data.includes('Likes Reales'));
    console.log('Admin has Dislikes Reales:', data.includes('Dislikes Reales'));
  });
});
