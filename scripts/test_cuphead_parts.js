const https = require('https');

async function testParts() {
  const base = "https://raw.githubusercontent.com/woahhcrackers/CupheadWeb/main/Build/";
  for (let i = 1; i <= 5; i++) {
    const p = `${base}Cuphead.data.${String(i).padStart(3, "0")}`;
    const status = await new Promise(r => {
      const req = https.request(p, { method: 'HEAD' }, res => r(res.statusCode));
      req.on('error', () => r(500));
      req.end();
    });
    console.log(p, '=>', status);
    if (status !== 200) break;
  }
}

testParts();
