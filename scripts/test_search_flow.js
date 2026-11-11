const https = require('https');

function httpsGet(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'RetroCloudBot/1.0 (contact@retrocloud.io)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function findCoverForGame(rawTitle) {
  // Limpiar título de sufijos y ruido
  let clean = rawTitle
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\b(wasm|webgl|web port|port|h5dx|quenq|three\.?js|html5|online|pico-?8|remake|edition)\b/gi, '')
    .replace(/[:\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 1. Probar opensearch con "clean + video game" o "clean"
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(clean + ' video game')}&limit=3&format=json`;
  const searchRes = await httpsGet(searchUrl);
  
  let candidates = searchRes && searchRes[1] ? searchRes[1] : [];
  if (candidates.length === 0) {
    const searchUrl2 = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(clean)}&limit=3&format=json`;
    const searchRes2 = await httpsGet(searchUrl2);
    candidates = searchRes2 && searchRes2[1] ? searchRes2[1] : [];
  }

  for (const cand of candidates) {
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cand.replace(/\s+/g, '_'))}`;
    const summary = await httpsGet(summaryUrl);
    if (summary && summary.thumbnail && summary.thumbnail.source) {
      // Retornar imagen en alta resolución
      return summary.thumbnail.source;
    }
  }

  return null;
}

async function testBatch() {
  const testList = [
    'Command & Conquer: Generals (wasm.com.br)',
    'Dragon Ball Z: Budokai 2',
    'Grand Theft Auto: Vice City (quenq)',
    'Need for Speed: Carbon (online multiplayer)',
    'Fallout 1 (Web Port)',
    'Daytona USA',
    'Overburden'
  ];

  for (const t of testList) {
    const img = await findCoverForGame(t);
    console.log(`${t} => ${img ? 'FOUND: ' + img.slice(0, 70) : 'NOT FOUND'}`);
  }
}

testBatch();
