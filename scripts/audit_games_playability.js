const fs = require('fs');
const http = require('http');
const https = require('https');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

console.log(`Starting playability audit for ${games.length} games...`);

function checkUrl(url, timeoutMs = 8000) {
  return new Promise((resolve) => {
    if (!url || url === '#' || url.startsWith('about:')) {
      return resolve({ ok: false, status: 0, reason: 'Empty or invalid URL' });
    }

    if (url.startsWith('./') || url.startsWith('/')) {
      // Local file check
      const localPath = url.replace(/^\.?\//, '').split('?')[0].split('#')[0];
      const indexPath = localPath.endsWith('/') ? localPath + 'index.html' : localPath;
      const exists = fs.existsSync(indexPath);
      return resolve({
        ok: exists,
        status: exists ? 200 : 404,
        isLocal: true,
        reason: exists ? 'Local file exists' : `File not found: ${indexPath}`
      });
    }

    let parsed;
    try {
      parsed = new URL(url);
    } catch (e) {
      return resolve({ ok: false, status: 0, reason: 'Invalid URL format' });
    }

    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.request(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      },
      timeout: timeoutMs
    }, (res) => {
      const statusCode = res.statusCode || 0;
      const headers = res.headers || {};
      const xFrame = (headers['x-frame-options'] || '').toLowerCase();
      const csp = (headers['content-security-policy'] || '').toLowerCase();

      let frameBlocked = false;
      let frameBlockReason = '';

      if (xFrame.includes('deny') || xFrame.includes('sameorigin')) {
        frameBlocked = true;
        frameBlockReason = `X-Frame-Options: ${xFrame}`;
      } else if (csp.includes("frame-ancestors 'none'") || csp.includes("frame-ancestors 'self'")) {
        frameBlocked = true;
        frameBlockReason = `CSP frame-ancestors blocked`;
      }

      // Read a small amount of data then abort
      res.on('data', () => {});
      res.on('end', () => {
        resolve({
          ok: statusCode >= 200 && statusCode < 400,
          status: statusCode,
          frameBlocked,
          frameBlockReason,
          redirect: (statusCode >= 300 && statusCode < 400) ? headers.location : null
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, status: 408, reason: 'Request timeout' });
    });

    req.on('error', (err) => {
      resolve({ ok: false, status: 0, reason: err.message });
    });

    req.end();
  });
}

async function auditAll() {
  const results = [];
  const concurrency = 10;
  
  for (let i = 0; i < games.length; i += concurrency) {
    const chunk = games.slice(i, i + concurrency);
    const promises = chunk.map(async (game) => {
      const targetUrl = game.url || (game.mirrors && game.mirrors[0] && game.mirrors[0].url) || '';
      const check = await checkUrl(targetUrl);
      return {
        id: game.id,
        title: game.title,
        launchMode: game.launchMode,
        url: targetUrl,
        ...check
      };
    });
    
    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
    process.stdout.write(`Audited ${results.length}/${games.length} games...\r`);
  }

  console.log(`\nAudit complete!`);
  
  const broken = results.filter(r => !r.ok);
  const frameIssues = results.filter(r => r.launchMode === 'iframe' && r.frameBlocked);
  
  console.log(`Summary:`);
  console.log(`Total: ${results.length}`);
  console.log(`OK: ${results.filter(r => r.ok && !r.frameBlocked).length}`);
  console.log(`Broken/Unreachable: ${broken.length}`);
  console.log(`Iframe blocked by headers: ${frameIssues.length}`);

  fs.writeFileSync('scripts/playability_audit_results.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    total: results.length,
    broken,
    frameIssues,
    all: results
  }, null, 2));

  // Write a markdown report
  let md = `# Reporte de Auditoría de Jugabilidad RetroCloud\n\n`;
  md += `**Fecha:** ${new Date().toLocaleString()}\n`;
  md += `**Total juegos auditados:** ${results.length}\n`;
  md += `**Juegos funcionales 100%:** ${results.filter(r => r.ok && (!r.frameBlocked || r.launchMode === 'external')).length}\n\n`;

  if (frameIssues.length > 0) {
    md += `## ⚠️ Juegos con Modo 'iframe' Bloqueados por Cabeceras (Deben pasar a 'external')\n`;
    md += `Estos juegos tienen \`X-Frame-Options: SAMEORIGIN\` o CSP restrictivo. Si se abren en iframe se ven grises/rotos, pero funcionan perfecto en modo Lanzador Externo:\n\n`;
    md += `| ID | Título | HTTP | Bloqueo | URL |\n`;
    md += `|---|---|---|---|---|\n`;
    frameIssues.forEach(f => {
      md += `| \`${f.id}\` | ${f.title} | ${f.status} | ${f.frameBlockReason} | [Link](${f.url}) |\n`;
    });
    md += `\n`;
  }

  if (broken.length > 0) {
    md += `## ❌ Juegos Caídos o con Timeout\n\n`;
    md += `| ID | Título | Status | Motivo | URL |\n`;
    md += `|---|---|---|---|---|\n`;
    broken.forEach(b => {
      md += `| \`${b.id}\` | ${b.title} | ${b.status} | ${b.reason || 'Error'} | [Link](${b.url}) |\n`;
    });
  }

  fs.writeFileSync('AUDIT_PLAYABILITY_REPORT.md', md, 'utf8');
  console.log('Report saved to AUDIT_PLAYABILITY_REPORT.md and scripts/playability_audit_results.json');
}

auditAll();
