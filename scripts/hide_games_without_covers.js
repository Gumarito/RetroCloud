const fs = require('fs');

const allGames = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// Fix sonic and kingdom rush steam headers
const sonic = allGames.find(g => g.id === 'sonic-the-hedgehog');
if (sonic) sonic.image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/71113/header.jpg';

const kr = allGames.find(g => g.id === 'kingdom-rush');
if (kr) kr.image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/246420/header.jpg';

// Known 404 images from audit:
const knownBadImages = new Set([
  'alley-cat',
  'bloodmoney',
  'battle-city',
  'moon',
  'pekka-kana-2',
  'road-rash'
]);

const withCover = [];
const withoutCover = [];

allGames.forEach(g => {
  const isSvg = !g.image || g.image.startsWith('data:') || g.image.includes('placeholder');
  const isBad = knownBadImages.has(g.id);
  
  if (isSvg || isBad) {
    withoutCover.push(g);
  } else {
    withCover.push(g);
  }
});

console.log(`Total games processed: ${allGames.length}`);
console.log(`Games with REAL cover (KEPT ACTIVE): ${withCover.length}`);
console.log(`Games without real cover (HIDDEN): ${withoutCover.length}`);

// Save active catalog
fs.writeFileSync('games.json', JSON.stringify(withCover, null, 2), 'utf8');

// Save hidden games pending manual cover review
fs.writeFileSync('games_pending_covers.json', JSON.stringify(withoutCover, null, 2), 'utf8');

// Generate markdown report
let md = `# Lista de Juegos Ocultos Pendientes de Portada Manual (${withoutCover.length} Juegos)\n\n`;
md += `Estos ${withoutCover.length} juegos fueron ocultados del catálogo principal para garantizar que la web solo muestre juegos con portadas reales y oficiales de alta resolución.\n\n`;
md += `| # | ID | Título | Categoría | Año | Desarrollador |\n`;
md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

withoutCover.forEach((g, idx) => {
  const dev = g.developer || 'N/A';
  const yr = g.year || 'N/A';
  const cat = g.category || 'Web Port';
  md += `| ${idx + 1} | \`${g.id}\` | **${g.title}** | ${cat} | ${yr} | ${dev} |\n`;
});

fs.writeFileSync('GAMES_PENDING_COVERS.md', md, 'utf8');
console.log('GAMES_PENDING_COVERS.md generated successfully!');
