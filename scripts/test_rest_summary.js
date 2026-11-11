const https = require('https');

function fetchRestSummary(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    https.get(url, { headers: { 'User-Agent': 'RetroCloud/1.0 (retrogaming@retrocloud.io)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.thumbnail?.source || null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const titles = ['Diablo_II', 'Quake_(video_game)', 'Age_of_Empires_(video_game)', 'Carmageddon', 'Half-Life_(video_game)', 'Doom_(1993_video_game)'];
  for (const t of titles) {
    const img = await fetchRestSummary(t);
    console.log(`${t} => ${img}`);
  }
}
run();
