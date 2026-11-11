const fs = require('fs');

async function auditAllGames() {
  const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
  console.log(`Auditoría Profunda de los ${games.length} juegos activos...\n`);

  const results = {
    cleanCanvasOrLocal: [],
    redirectsToPortalRoot: [],
    portalOrAggregator: [],
    deadOrError: []
  };

  for (let i = 0; i < games.length; i++) {
    const g = games[i];
    const url = g.url || g.file || '';

    // Si es local
    if (url.startsWith('./') || url.startsWith('/')) {
      results.cleanCanvasOrLocal.push({ id: g.id, title: g.title, reason: 'Local en RetroCloud' });
      continue;
    }

    try {
      // 1. Check redirect manual
      const headRes = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0' } });
      const location = headRes.headers.get('location');

      if ([301, 302, 303, 307, 308].includes(headRes.status)) {
        // Redirige
        const finalUrl = new URL(location, url).href;
        const u = new URL(finalUrl);
        if (u.pathname === '/' || u.pathname === '') {
          results.redirectsToPortalRoot.push({
            id: g.id,
            title: g.title,
            originalUrl: url,
            redirectsTo: finalUrl,
            status: headRes.status
          });
          continue;
        }
      }

      // 2. Fetch final URL content
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        results.deadOrError.push({ id: g.id, title: g.title, url, status: res.status });
        continue;
      }

      const finalUrl = res.url;
      const text = await res.text();
      const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';

      // Check if it redirected to root
      try {
        const u = new URL(finalUrl);
        if ((u.pathname === '/' || u.pathname === '') && (finalUrl !== url)) {
          results.redirectsToPortalRoot.push({
            id: g.id,
            title: g.title,
            originalUrl: url,
            redirectsTo: finalUrl
          });
          continue;
        }
      } catch(e) {}

      // Check portal indicators:
      const lowerText = text.toLowerCase();
      const lowerTitle = title.toLowerCase();

      const isAggregator = 
        lowerTitle.includes('play games in your browser') ||
        lowerTitle.includes('unblocked games') ||
        lowerTitle.includes('free online games') ||
        lowerTitle.includes('dos games online') ||
        lowerTitle.includes('wasm arcade') ||
        lowerText.includes('browse games') ||
        lowerText.includes('all games') && text.match(/<a [^>]*href=[^>]*>/gi)?.length > 40;

      if (isAggregator && !url.includes('.github.io') && !url.includes('wasm.rip/files')) {
        results.portalOrAggregator.push({
          id: g.id,
          title: g.title,
          url,
          pageTitle: title,
          reason: 'Detectado portal/agregador con lista de juegos'
        });
      } else {
        results.cleanCanvasOrLocal.push({ id: g.id, title: g.title, url, pageTitle: title });
      }

    } catch(err) {
      results.deadOrError.push({ id: g.id, title: g.title, url, error: err.message });
    }
  }

  console.log('\n================ RESULTADOS DE LA AUDITORÍA ================');
  console.log(`✅ Juegos limpios (Canvas/Directos): ${results.cleanCanvasOrLocal.length}`);
  console.log(`🚨 Redirigen a la Home de un portal: ${results.redirectsToPortalRoot.length}`);
  console.log(`⚠️ Portales / Directorios competidores: ${results.portalOrAggregator.length}`);
  console.log(`❌ Errores / Caídos (404/403/timeout): ${results.deadOrError.length}`);

  if (results.redirectsToPortalRoot.length > 0) {
    console.log('\n--- REDIRIGEN A LA HOME DE OTRO PORTAL ---');
    results.redirectsToPortalRoot.forEach(r => console.log(`- [${r.id}] "${r.title}": ${r.originalUrl} -> ${r.redirectsTo}`));
  }

  if (results.portalOrAggregator.length > 0) {
    console.log('\n--- PORTALES COMPETIDORES DETECTADOS ---');
    results.portalOrAggregator.forEach(r => console.log(`- [${r.id}] "${r.title}": ${r.url} (Título: "${r.pageTitle}")`));
  }

  if (results.deadOrError.length > 0) {
    console.log('\n--- CAÍDOS O CON ERROR ---');
    results.deadOrError.forEach(r => console.log(`- [${r.id}] "${r.title}": ${r.url} (${r.status || r.error})`));
  }

  fs.writeFileSync('audit_full_176.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('\nReporte guardado en audit_full_176.json');
}

auditAllGames();
