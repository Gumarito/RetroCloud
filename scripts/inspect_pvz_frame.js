const https = require('https');

https.get('https://plantsvszombies.online/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const iframes = data.match(/<iframe[^>]*>/g);
    console.log('Iframes:', iframes);
    const canvas = data.match(/<canvas[^>]*>/g);
    console.log('Canvas:', canvas);
    const gamesrc = data.match(/src="[^"]*pvz[^"]*"/g) || data.match(/src="[^"]*game[^"]*"/g);
    console.log('Game srcs:', gamesrc);
  });
});
