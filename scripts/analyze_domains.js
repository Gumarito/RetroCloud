const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const domainMap = {};

games.forEach(g => {
  const url = g.file || g.url || '';
  let domain = 'local';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const u = new URL(url);
      domain = u.hostname;
    } catch(e) {
      domain = 'invalid_url';
    }
  }
  if (!domainMap[domain]) domainMap[domain] = [];
  domainMap[domain].push({ id: g.id, title: g.title, url });
});

console.log('=== TOTAL JUEGOS EN games.json:', games.length, '===');
const sortedDomains = Object.entries(domainMap).sort((a, b) => b[1].length - a[1].length);

for (const [dom, list] of sortedDomains) {
  console.log(`\n### Dominio: ${dom} (${list.length} juegos)`);
  list.forEach(x => {
    console.log(` - [${x.id}] "${x.title}" -> ${x.url}`);
  });
}
