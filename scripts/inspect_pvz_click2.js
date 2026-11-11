const https = require('https');

https.get('https://rgc.zone/ports/pvzweb/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    scripts.forEach((s, i) => {
      if (s.includes('addEventListener("click"') || s.includes("addEventListener('click'")) {
        console.log(`Script ${i}:`);
        console.log(s);
      }
    });
  });
});
