const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const urls = [
  '  <url>\n    <loc>https://gumarito.github.io/RetroCloud/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>'
];

games.forEach(g => {
  urls.push(`  <url>\n    <loc>https://gumarito.github.io/RetroCloud/?game=${encodeURIComponent(g.id)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
fs.writeFileSync('sitemap.xml', xml, 'utf8');
console.log(`sitemap.xml updated with ${games.length} games!`);
