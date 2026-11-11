const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const audit = JSON.parse(fs.readFileSync('scripts/playability_audit_results.json', 'utf8'));

// 1. Set launchMode to "external" for games that work in new tabs but are blocked by iframe headers
const switchExternalIds = [
  'cookie-clicker',
  'grand-theft-auto-vice-city',
  'quake',
  'spelunky-classic-hd',
  'urban-terror'
];

games.forEach(g => {
  if (switchExternalIds.includes(g.id)) {
    g.launchMode = 'external';
    console.log(`Switched ${g.id} (${g.title}) to launchMode: external`);
  }
});

// 2. Identify broken games (excluding cookie-clicker which works externally)
const brokenIds = audit.broken
  .map(b => b.id)
  .filter(id => !switchExternalIds.includes(id));

const activeGames = [];
const brokenGames = [];

games.forEach(g => {
  if (brokenIds.includes(g.id)) {
    brokenGames.push(g);
  } else {
    activeGames.push(g);
  }
});

console.log(`Active 100% playable games: ${activeGames.length}`);
console.log(`Moved to pending repair: ${brokenGames.length}`);

// Write updated games.json
fs.writeFileSync('games.json', JSON.stringify(activeGames, null, 2), 'utf8');

// Write games_pending_repair.json
fs.writeFileSync('games_pending_repair.json', JSON.stringify(brokenGames, null, 2), 'utf8');

// Update sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://retrocloud.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${activeGames.map(g => `  <url>
    <loc>https://retrocloud.app/#game=${encodeURIComponent(g.id)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log(`sitemap.xml updated with ${activeGames.length} valid games.`);

// Create clean markdown report
let md = `# Catálogo de Juegos Pendientes de Reparación / Nuevos Mirrors (Total: ${brokenGames.length})\n\n`;
md += `Estos títulos fueron retirados de \`games.json\` de forma preventiva para el lanzamiento del martes porque sus URLs originales (en su mayoría de repositorios DMCA de gn-math o dominios caídos) devolvieron HTTP 404 o timeout.\n\n`;
md += `En cuanto consigamos un mirror estable o port local de estos juegos, se pueden reintegrar inmediatamente a \`games.json\`.\n\n`;
md += `| # | ID | Título | Categoría | Última URL Conocida |\n`;
md += `|---|---|---|---|---|\n`;
brokenGames.forEach((g, i) => {
  const url = g.url || (g.mirrors && g.mirrors[0] && g.mirrors[0].url) || '';
  md += `| ${i + 1} | \`${g.id}\` | **${g.title}** | ${g.category} | ${url} |\n`;
});

fs.writeFileSync('GAMES_PENDING_REPAIR.md', md, 'utf8');
console.log('Saved GAMES_PENDING_REPAIR.md successfully.');
