const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const playIdx = data.indexOf('Play') || data.indexOf('play');
    console.log('Play context:');
    const idxs = [];
    let pos = 0;
    while ((pos = data.indexOf('play', pos)) !== -1) {
      idxs.push(pos);
      pos += 4;
    }
    idxs.slice(0, 10).forEach(i => {
      console.log('--- at', i, '---');
      console.log(data.slice(Math.max(0, i - 100), Math.min(data.length, i + 150)));
    });
  });
});
