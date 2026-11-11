const fs = require('fs');
const https = require('https');
const path = require('path');

const GAMES_FILE = path.join(__dirname, '..', 'games.json');

function httpsGet(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'RetroCloudBot/2.0 (retrogaming@retrocloud.io)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function findCoverForGame(rawTitle) {
  // Limpiar título de sufijos técnicos y ruido
  let clean = rawTitle
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\b(wasm|webgl|web port|port|h5dx|quenq|three\.?js|html5|online|pico-?8|remake|edition|demo|v\d+.*)\b/gi, '')
    .replace(/[:\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const queries = [
    clean + ' video game',
    clean + ' game',
    clean
  ];

  for (const q of queries) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=3&format=json`;
    const searchRes = await httpsGet(searchUrl);
    const candidates = searchRes && searchRes[1] ? searchRes[1] : [];

    for (const cand of candidates) {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cand.replace(/\s+/g, '_'))}`;
      const summary = await httpsGet(summaryUrl);
      if (summary && summary.thumbnail && summary.thumbnail.source) {
        // Asegurar que no sea un placeholder genérico
        const src = summary.thumbnail.source;
        if (src.includes('.jpg') || src.includes('.png') || src.includes('.webp') || src.includes('.jpeg')) {
          return src;
        }
      }
    }
  }

  return null;
}

function generateRetroPoster(title, category) {
  const safeTitle = title.replace(/[<>&"]/g, '');
  const safeCat = (category || 'ARCADE CLASSIC').toUpperCase().replace(/[<>&"]/g, '');
  
  // Paletas de color por categoría
  let c1 = '#4f46e5', c2 = '#7c3aed', c3 = '#06b6d4';
  if (/action|lucha|combate|fps/i.test(category)) { c1 = '#dc2626'; c2 = '#991b1b'; c3 = '#f97316'; }
  else if (/puzzle|lógica|ingenio/i.test(category)) { c1 = '#059669'; c2 = '#047857'; c3 = '#10b981'; }
  else if (/carrera|velocidad|deporte/i.test(category)) { c1 = '#ea580c'; c2 = '#c2410c'; c3 = '#fbbf24'; }
  else if (/rpg|aventura|open-world/i.test(category)) { c1 = '#7c3aed'; c2 = '#5b21b6'; c3 = '#a855f7'; }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="50%" stop-color="#1e1b4b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="50%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <circle cx="200" cy="95" r="50" fill="${c1}" opacity="0.18"/>
    <rect x="15" y="15" width="370" height="220" rx="14" fill="none" stroke="url(#glow)" stroke-width="2.5" opacity="0.6"/>
    <text x="200" y="105" text-anchor="middle" font-size="44" fill="#ffffff" opacity="0.95">🕹️</text>
    <text x="200" y="150" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="${c3}" letter-spacing="2">${safeCat}</text>
    <text x="200" y="180" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="0.5">${safeTitle.slice(0, 32)}</text>
    <rect x="155" y="200" width="90" height="18" rx="9" fill="url(#glow)" opacity="0.9"/>
    <text x="200" y="213" text-anchor="middle" font-family="monospace" font-size="9" font-weight="bold" fill="#ffffff" letter-spacing="1">RETROCLOUD</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function main() {
  console.log('[RetroCloud] Cargando catálogo...');
  const raw = fs.readFileSync(GAMES_FILE, 'utf8');
  let games = JSON.parse(raw);
  if (games.value) games = games.value;

  console.log(`[RetroCloud] Total juegos: ${games.length}`);

  let updatedWiki = 0;
  let updatedGenerated = 0;
  let unchanged = 0;

  for (let i = 0; i < games.length; i++) {
    const g = games[i];
    const isUnsplash = !g.image || g.image.includes('unsplash.com') || g.image.length < 10;

    if (!isUnsplash) {
      unchanged++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${games.length}] Buscando: ${g.title}... `);
    const wikiCover = await findCoverForGame(g.title);

    if (wikiCover) {
      g.image = wikiCover;
      updatedWiki++;
      console.log(`✅ WIKI: ${wikiCover.slice(0, 50)}...`);
    } else {
      g.image = generateRetroPoster(g.title, g.category);
      updatedGenerated++;
      console.log(`🎨 POSTER RETRO GENERADO`);
    }

    // Pequeño retardo para respetar rate limits de Wikipedia (50ms)
    await new Promise(r => setTimeout(r, 60));
  }

  // Guardar archivo plano en UTF-8 sin BOM
  fs.writeFileSync(GAMES_FILE, JSON.stringify(games, null, 2), 'utf8');

  console.log('\n========================================');
  console.log(`[FIN] Juegos conservados: ${unchanged}`);
  console.log(`[FIN] Carátulas oficiales Wikipedia asignadas: ${updatedWiki}`);
  console.log(`[FIN] Posters retro elegantes generados: ${updatedGenerated}`);
  console.log(`[FIN] Total juegos con Unsplash ahora: 0 (100% CERO UNSPLASH)`);
  console.log('========================================');
}

main();
