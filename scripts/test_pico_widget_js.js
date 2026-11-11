const https = require('https');

https.get('https://www.lexaloffle.com/bbs/widget.php?pid=celeste', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const scripts = data.match(/<script[^>]*src="[^"]*"[^>]*>/gi) || [];
    console.log(scripts);
    const jsFiles = data.match(/[\w\.\/-]+\.js/g);
    console.log(jsFiles);
  });
});
