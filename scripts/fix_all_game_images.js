const fs = require('fs');
const https = require('https');

// Curated high-priority box arts from Libretro / Steam / Official CDNs
const CURATED = {
  'super-mario-64': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_64/master/Named_Boxarts/Super%20Mario%2064%20(USA).png',
  'super-mario-64-multiplayer': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_64/master/Named_Boxarts/Super%20Mario%2064%20(USA).png',
  'minecraft-1-8-8': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Wii_U/master/Named_Boxarts/Minecraft%20-%20Wii%20U%20Edition%20(USA)%20(En%2CJa%2CFr%2CDe%2CEs%2CIt%2CNl%2CPt%2CZh%2CKo%2CRu)%20(Rev%201).png',
  'minecraft-0-6-1': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Wii_U/master/Named_Boxarts/Minecraft%20-%20Wii%20U%20Edition%20(USA)%20(En%2CJa%2CFr%2CDe%2CEs%2CIt%2CNl%2CPt%2CZh%2CKo%2CRu)%20(Rev%201).png',
  'minecraft-pocket-edition': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Wii_U/master/Named_Boxarts/Minecraft%20-%20Wii%20U%20Edition%20(USA)%20(En%2CJa%2CFr%2CDe%2CEs%2CIt%2CNl%2CPt%2CZh%2CKo%2CRu)%20(Rev%201).png',
  'minecraft-story-mode': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376870/header.jpg',
  'tekken-4': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_2/master/Named_Boxarts/Tekken%204%20(USA).png',
  'tekken-5': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_2/master/Named_Boxarts/Tekken%205%20(USA).png',
  'tekken-dark-resurrection': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_Portable/master/Named_Boxarts/Tekken%20-%20Dark%20Resurrection%20(USA)%20(En%2CFr%2CDe%2CEs%2CIt).png',
  'tekken-5-dark-resurrection': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_Portable/master/Named_Boxarts/Tekken%20-%20Dark%20Resurrection%20(USA)%20(En%2CFr%2CDe%2CEs%2CIt).png',
  'simpsons-hit-and-run': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_2/master/Named_Boxarts/Simpsons%2C%20The%20-%20Hit%20_%20Run%20(USA).png',
  'naruto-shippuden-ultimate-ninja-5': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_2/master/Named_Boxarts/Naruto%20Shippuden%20-%20Ultimate%20Ninja%205%20(Europe)%20(En%2CFr%2CDe%2CEs%2CIt).png',
  'naruto-shippuden-ultimate-ninja-impact': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_Portable/master/Named_Boxarts/Naruto%20Shippuden%20-%20Ultimate%20Ninja%20Impact%20(Europe)%20(En%2CFr%2CDe%2CEs%2CIt).png',
  'hollow-knight': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg',
  'hollow-knight-silksong': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/header.jpg',
  'cookie-clicker': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1454400/header.jpg',
  'geometry-dash': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/header.jpg',
  'sonic-the-hedgehog': 'https://raw.githubusercontent.com/libretro-thumbnails/Sega_-_Mega_Drive_-_Genesis/master/Named_Boxarts/Sonic%20the%20Hedgehog%20(USA%2C%20Europe).png',
  'burnout-3-takedown': 'https://raw.githubusercontent.com/libretro-thumbnails/Sony_-_PlayStation_2/master/Named_Boxarts/Burnout%203%20-%20Takedown%20(USA).png',
  'animal-crossing': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_GameCube/master/Named_Boxarts/Animal%20Crossing%20(USA).png',
  'golden-sun': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Golden%20Sun%20(USA%2C%20Europe).png',
  'battle-city': 'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Nintendo_Entertainment_System/master/Named_Boxarts/Battle%20City%20(Japan).png',
  'call-of-duty-modern-warfare-2': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10180/header.jpg',
  'call-of-duty-black-ops-zombies': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/42700/header.jpg',
  'counter-strike-1-6': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/header.jpg',
  'cuphead': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/268910/header.jpg',
  'half-life': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/header.jpg',
  'plants-vs-zombies': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/header.jpg',
  'five-nights-at-freddy-s': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/319510/header.jpg',
  'undertale': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/header.jpg',
  'celeste': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/504230/header.jpg',
  'among-us': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg',
  'brotato': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1942280/header.jpg',
  'buckshot-roulette': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2835570/header.jpg',
  'bendy-and-the-ink-machine': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/622650/header.jpg',
  'the-binding-of-isaac-repentance': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426300/header.jpg',
  'brawlhalla': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/header.jpg',
  'castle-crashers': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/204360/header.jpg',
  'cave-story': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/200900/header.jpg',
  'getting-over-it-with-bennett-foddy': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/240720/header.jpg',
  'people-playground': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1118200/header.jpg',
  's-t-a-l-k-e-r-call-of-pripyat': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/41700/header.jpg',
  'kindergarten': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578590/header.jpg',
  'tomb-raider': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/203160/header.jpg',
  '20-minutes-till-dawn': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966900/header.jpg',
  'amanda-the-adventurer': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2166060/header.jpg',
  'brutal-doom': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2280/header.jpg',
  'gta-vice-city': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/header.jpg',
  'carmageddon': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/282010/header.jpg',
  'carmageddon-ii-carpocalypse-now': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/282030/header.jpg'
};

function generateRetroCardSvg(game) {
  const title = (game.title || 'Retro Game').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const category = (game.category || 'Arcade').replace(/&/g, '&amp;');
  const year = game.year || 'Retro';
  const dev = (game.developer || 'RetroCloud Classics').replace(/&/g, '&amp;');
  
  // Palette selection based on game title hash
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash << 5) - hash + title.charCodeAt(i);
  const palettes = [
    { bg1: '#0f172a', bg2: '#1e1b4b', accent: '#6366f1', glow: '#818cf8', tag: '#4338ca' },
    { bg1: '#18181b', bg2: '#3f1d38', accent: '#ec4899', glow: '#f472b6', tag: '#9d174d' },
    { bg1: '#022c22', bg2: '#064e3b', accent: '#10b981', glow: '#34d399', tag: '#047857' },
    { bg1: '#1c1917', bg2: '#451a03', accent: '#f59e0b', glow: '#fbbf24', tag: '#b45309' },
    { bg1: '#1e1b4b', bg2: '#311042', accent: '#a855f7', glow: '#c084fc', tag: '#6b21a8' },
    { bg1: '#082f49', bg2: '#0c4a6e', accent: '#06b6d4', glow: '#22d3ee', tag: '#0e7490' }
  ];
  const p = palettes[Math.abs(hash) % palettes.length];
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 338" width="600" height="338">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}"/>
      <stop offset="60%" stop-color="${p.bg2}"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.accent}"/>
      <stop offset="100%" stop-color="${p.glow}"/>
    </linearGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="600" height="338" fill="url(#bg)"/>
  <rect width="600" height="338" fill="url(#grid)"/>
  
  <!-- Retro Decorative Cartridge Bars -->
  <rect x="0" y="0" width="600" height="6" fill="url(#accentGrad)"/>
  <rect x="36" y="32" width="12" height="12" fill="${p.glow}" opacity="0.8"/>
  <rect x="54" y="32" width="12" height="12" fill="${p.glow}" opacity="0.4"/>
  <rect x="72" y="32" width="12" height="12" fill="${p.glow}" opacity="0.2"/>
  
  <!-- Category Pill -->
  <rect x="36" y="58" width="${Math.min(200, category.length * 10 + 24)}" height="24" rx="4" fill="${p.tag}" fill-opacity="0.65" stroke="${p.accent}" stroke-width="1"/>
  <text x="48" y="74" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">${category.toUpperCase()}</text>
  
  <!-- Year Badge -->
  <rect x="${Math.min(200, category.length * 10 + 24) + 44}" y="58" width="56" height="24" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <text x="${Math.min(200, category.length * 10 + 24) + 72}" y="74" text-anchor="middle" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600">${year}</text>
  
  <!-- Gamepad Vector Emblem -->
  <g transform="translate(450, 110) scale(1.6)" opacity="0.18">
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S20.17 9 21 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#ffffff"/>
  </g>
  
  <!-- Main Title -->
  <text x="36" y="170" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" letter-spacing="-0.5">${title.length > 28 ? title.slice(0, 26) + '...' : title}</text>
  
  <!-- Developer / Subtitle -->
  <text x="36" y="202" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500">${dev}</text>
  
  <!-- Retro scanlines overlay -->
  <line x1="36" y1="280" x2="564" y2="280" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="36" y="304" fill="${p.glow}" font-family="monospace" font-size="10" letter-spacing="2">RETROCLOUD CERTIFIED EDITION</text>
  <text x="564" y="304" text-anchor="end" fill="#64748b" font-family="monospace" font-size="10">PWA READY</text>
</svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function cleanTitleForSearch(title) {
  return title
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/WebGL Port/gi, '')
    .replace(/Web Edition/gi, '')
    .replace(/Web Port/gi, '')
    .replace(/WASM/gi, '')
    .replace(/HTML5/gi, '')
    .replace(/Fan Made/gi, '')
    .replace(/Recomp/gi, '')
    .replace(/:/g, '')
    .replace(/-/g, ' ')
    .trim();
}

async function searchSteam(query) {
  return new Promise((resolve) => {
    const q = encodeURIComponent(query);
    const req = https.get('https://store.steampowered.com/api/storesearch/?term=' + q + '&l=english&cc=US', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.items && j.items.length > 0) {
            resolve(j.items[0]);
          } else {
            resolve(null);
          }
        } catch(e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

function titleSimilarity(s1, s2) {
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const n1 = norm(s1);
  const n2 = norm(s2);
  if (n1 === n2) return 1.0;
  if (n1.includes(n2) || n2.includes(n1)) return 0.85;
  return 0;
}

async function main() {
  const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
  console.log(`Processing ${games.length} games...`);
  
  let curatedCount = 0;
  let steamCount = 0;
  let svgCount = 0;
  let preservedCount = 0;

  for (let i = 0; i < games.length; i++) {
    const g = games[i];
    
    // Check if explicitly curated
    if (CURATED[g.id]) {
      g.image = CURATED[g.id];
      curatedCount++;
      continue;
    }

    // Check if current image is problematic (Wikimedia or 404/429/timeout)
    const isWiki = g.image && (g.image.includes('wikimedia.org') || g.image.includes('wikipedia'));
    const isSvg = g.image && g.image.startsWith('data:image/svg+xml');
    const isSteam = g.image && g.image.includes('steamstatic.com');
    
    // If it's already a working Steam asset or custom non-wiki URL, preserve it
    if (!isWiki) {
      preservedCount++;
      continue;
    }

    // Attempt Steam store search
    const clean = cleanTitleForSearch(g.title);
    if (clean.length > 2) {
      const match = await searchSteam(clean);
      if (match && titleSimilarity(clean, match.name) >= 0.7) {
        g.image = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${match.id}/header.jpg`;
        steamCount++;
        continue;
      }
    }

    // Fallback: Generate crisp themed retro cartridge SVG
    g.image = generateRetroCardSvg(g);
    svgCount++;
  }

  console.log('--- REPLACEMENT SUMMARY ---');
  console.log(`Curated Flagship Replacements: ${curatedCount}`);
  console.log(`Steam Auto-Matched Replacements: ${steamCount}`);
  console.log(`Themed Retro Cartridge SVGs: ${svgCount}`);
  console.log(`Preserved (Existing Good Images): ${preservedCount}`);
  console.log(`Total games in catalog: ${games.length}`);

  // Save games.json as flat JSON array without BOM
  fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
  console.log('games.json successfully written and normalized!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
