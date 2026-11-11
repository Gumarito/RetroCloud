const https = require('https');

function fetchWikiImage(query) {
  return new Promise((resolve) => {
    const clean = query.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(clean + ' video game')}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json`;
    
    https.get(url, { headers: { 'User-Agent': 'RetroCloudBot/1.0 (contact@retrocloud.io)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (pages) {
            const firstKey = Object.keys(pages)[0];
            const source = pages[firstKey]?.thumbnail?.source;
            resolve(source || null);
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function test() {
  const games = ['Carmageddon', 'Diablo II', 'Age of Empires', 'Quake II', 'Overburden'];
  for (const g of games) {
    const img = await fetchWikiImage(g);
    console.log(`${g} => ${img}`);
  }
}

test();
