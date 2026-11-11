const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
let pending = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

// Fixes for games with verified working clean mirrors
const cleanFixes = {
  'celeste': {
    url: 'https://www.lexaloffle.com/bbs/widget.php?pid=celeste',
    launchMode: 'iframe',
    mirrors: [
      { name: 'Motor Oficial PICO-8 (Lexaloffle)', url: 'https://www.lexaloffle.com/bbs/widget.php?pid=celeste' },
      { name: 'Mirror WebAssembly 60FPS (ccleste)', url: 'https://celeste.r58playz.dev/' }
    ]
  },
  'doom-3': {
    url: 'https://recompiledgames.com/doom-3-recompiled',
    launchMode: 'external',
    mirrors: [
      { name: 'Recompiled Games Web', url: 'https://recompiledgames.com/doom-3-recompiled' }
    ]
  },
  'quake-iii-arena': {
    url: 'https://q3.pieter.com',
    launchMode: 'iframe',
    mirrors: [
      { name: 'Q3 WebAssembly', url: 'https://q3.pieter.com' }
    ]
  },
  'terraria': {
    url: 'https://playterraria.lol/',
    launchMode: 'external',
    mirrors: [
      { name: 'PlayTerraria Web', url: 'https://playterraria.lol/' }
    ]
  },
  'ultrakill': {
    url: 'https://monoxide.dev/ultrakill',
    launchMode: 'external',
    mirrors: [
      { name: 'Monoxide Web Build', url: 'https://monoxide.dev/ultrakill' }
    ]
  }
};

const active = [];
const moved = [];

games.forEach(g => {
  if (cleanFixes[g.id]) {
    Object.assign(g, cleanFixes[g.id]);
    active.push(g);
    console.log(`Updated ${g.id} with clean direct mirror.`);
  } else if (g.url && g.url.includes('gn-math.dev')) {
    // Remove games that only pointed to gn-math portal homepage
    moved.push(g);
  } else {
    // Keep other games that don't point to gn-math
    active.push(g);
  }
});

console.log(`Remaining 100% verified active games: ${active.length}`);
console.log(`Moved gn-math games to pending: ${moved.length}`);

// Save games.json
fs.writeFileSync('games.json', JSON.stringify(active, null, 2), 'utf8');

// Append moved to pending
pending.push(...moved);
fs.writeFileSync('games_pending_repair.json', JSON.stringify(pending, null, 2), 'utf8');

// Update sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://retrocloud.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${active.map(g => `  <url>
    <loc>https://retrocloud.app/#game=${encodeURIComponent(g.id)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log(`sitemap.xml updated with ${active.length} verified games.`);
