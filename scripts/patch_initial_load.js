const fs = require('fs');

// =========================================================================
// 1. PATCH ADMIN.HTML (REAL USER VOTES ONLY)
// =========================================================================
let admin = fs.readFileSync('admin.html', 'utf8');

// Replace KPI calculation
admin = admin.replace(
  /const plays = \(gData\.plays \|\| 0\) \+ \(g\.plays \|\| 0\);[\s\S]*?const dislikes = Math\.max\(0, \(g\.dislikes \|\| 0\) \+ \(d\.dislikes \|\| 0\)\);/g,
  `const plays = (gData.plays || 0);
                const playtime = (gData.playtimeSeconds || 0);
                const likes = Math.max(0, (d.likes || 0));
                const dislikes = Math.max(0, (d.dislikes || 0));`
);

// Replace Table header labels
admin = admin.replace('Likes ▲', 'Likes Reales ▲');
admin = admin.replace('Dislikes ▼', 'Dislikes Reales ▼');

// Update notice text in admin
admin = admin.replace(
  '<h2 class="text-sm font-bold text-white">Catálogo Completo de Juegos & Métricas</h2>',
  '<h2 class="text-sm font-bold text-white">Catálogo Completo de Juegos & Métricas (100% Votos Reales de Usuarios)</h2>'
);

fs.writeFileSync('admin.html', admin, 'utf8');
console.log('admin.html successfully patched to show ONLY real user votes!');

// =========================================================================
// 2. PATCH INDEX.HTML (FIX CATALOG LOADING & INITIALIZATION)
// =========================================================================
let html = fs.readFileSync('index.html', 'utf8');

// Ensure featuredGameOrder and featuredGameRanks are defined at top of script
const topStateVars = `
        // Variables globales de estado y orden de destacados (Definidas en el tope)
        const featuredGameOrder = [
            'minecraft-1-8-8',
            'gta-vice-city',
            'doom',
            'super-mario-64',
            'subway-surfers',
            'hollow-knight',
            'tekken-5'
        ];
        const featuredGameRanks = new Map(featuredGameOrder.map((id, index) => [id, index]));
        let currentSort = 'default';
        let activeCollection = 'all';
        let currentPage = 1;
        const PAGE_SIZE = 28;
`;

if (!html.includes('Variables globales de estado y orden de destacados (Definidas en el tope)')) {
  // Insert at top of main script (right after <script> tag at line 863)
  const scriptTag = '<script>\n';
  const pos = html.indexOf(scriptTag, 800);
  if (pos !== -1) {
    html = html.substring(0, pos + scriptTag.length) + topStateVars + html.substring(pos + scriptTag.length);
    console.log('Inserted topStateVars at top of script!');
  }
}

// Remove duplicate declarations lower down
html = html.replace(/let currentSort = 'default';\s*const featuredGameOrder = \[[\s\S]*?\];\s*const featuredGameRanks = new Map\([\s\S]*?\);/m, '// featuredGameOrder & ranks hoisted to top');

// Fix aggressive mobile collection override in DOMContentLoaded
html = html.replace(
  /if \(\(window\.matchMedia && window\.matchMedia\('\(pointer: coarse\)'\)\.matches\) \|\| \/Android\|iPhone\|iPad\|Mobile\/i\.test\(navigator\.userAgent\) \|\| window\.innerWidth <= 768\) \{\s*activeCollection = 'mobile';\s*\}/m,
  `// Iniciar siempre mostrando Todos los juegos por defecto (usuario puede cambiar a Táctil en cualquier momento)
            activeCollection = 'all';`
);

// Fix robust execution of loadCatalog
const oldLoadCatalogRegex = /async function loadCatalog\(\) \{[\s\S]*?catalogLoaded = true;\s*renderRecentlyPlayed\(\);\s*renderGames\(\);/m;

const newLoadCatalog = `async function loadCatalog() {
            try {
                // Siempre cargar datos frescos para garantizar catálogo al 100%
                const res = await fetch('./games.json?v=' + Date.now());
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const rawJson = await res.json();
                games = normalizeCatalogData(rawJson);
            } catch (err) {
                console.error('[RetroCloud] Error cargando games.json remoto, intentando fallback...', err);
                try {
                    const cached = sessionStorage.getItem('retrocloud_catalog_cache_v3');
                    if (cached) {
                        games = normalizeCatalogData(JSON.parse(cached));
                    } else {
                        throw err;
                    }
                } catch(e) {
                    console.error('[RetroCloud] Falló fallback', e);
                    document.getElementById('gamesGrid').innerHTML = '<p class="col-span-full text-center text-red-400 py-10">No se pudo cargar el catálogo. Verifica que el servidor local esté activo en http://localhost:3000.</p>';
                    return;
                }
            }
            catalogLoaded = true;
            try { sessionStorage.setItem('retrocloud_catalog_cache_v3', JSON.stringify(games)); } catch(e){}
            renderRecentlyPlayed();
            renderGames();`;

if (oldLoadCatalogRegex.test(html)) {
  html = html.replace(oldLoadCatalogRegex, newLoadCatalog);
  console.log('Replaced loadCatalog with robust direct loader!');
} else {
  console.log('Warning: oldLoadCatalogRegex did not match');
}

// Ensure DOMContentLoaded fires even if readyState is already interactive or complete
const domLoadedRegex = /window\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{/m;
const safeInitCode = `function initRetroCloudApp() {`;

if (domLoadedRegex.test(html)) {
  html = html.replace(domLoadedRegex, safeInitCode);
  // At the end of the init handler, replace closing `});` with safe trigger
  html = html.replace(
    /console\.log\('%c⚡ RetroCloud Engine & Security[\s\S]*?'\);\s*\}\);/m,
    `console.log('%c⚡ RetroCloud Engine & Security ⚡', 'color:#818cf8;font-size:16px;font-weight:bold;');
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initRetroCloudApp);
        } else {
            initRetroCloudApp();
        }`
  );
  console.log('Replaced DOMContentLoaded with safe self-executing initRetroCloudApp!');
} else {
  console.log('Warning: domLoadedRegex did not match');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated and hardened!');
