const fs = require('fs');
const https = require('https');
const http = require('http');

const pending = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

console.log(`Starting automated audit for ${pending.length} pending games...`);

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const client = u.protocol === 'https:' ? https : http;
      const req = client.request(u, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 6000
      }, (res) => {
        let xFrame = res.headers['x-frame-options'] || '';
        let csp = res.headers['content-security-policy'] || '';
        let canIframe = !xFrame && !csp.includes('frame-ancestors');
        resolve({
          status: res.statusCode,
          canIframe: canIframe,
          location: res.headers.location || null
        });
        req.destroy();
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ status: 408, error: 'Timeout 6s' });
      });

      req.on('error', (err) => {
        resolve({ status: 500, error: err.message });
      });

      req.end();
    } catch(e) {
      resolve({ status: 400, error: e.message });
    }
  });
}

async function runAudit() {
  const results = [];
  const viable = [];
  const broken = [];

  for (let i = 0; i < pending.length; i++) {
    const g = pending[i];
    const check = await checkUrl(g.url);
    g.lastAuditCode = check.status;
    g.canIframe = check.canIframe;
    g.auditDate = new Date().toISOString();

    if (check.status >= 200 && check.status < 400) {
      g.auditStatus = 'LIVE';
      viable.push(g);
      console.log(`[${i+1}/${pending.length}] ✅ LIVE (${check.status}): ${g.title} -> ${g.url.substring(0, 45)}...`);
    } else {
      g.auditStatus = 'DEAD';
      g.auditReason = `HTTP ${check.status}: ${check.error || 'Server error'}`;
      broken.push(g);
      console.log(`[${i+1}/${pending.length}] ❌ DEAD (${check.status}): ${g.title} -> ${g.auditReason}`);
    }
    results.push(g);
  }

  console.log(`\nAudit Complete!`);
  console.log(`Total games audited: ${results.length}`);
  console.log(`Viable games (LIVE 200-399): ${viable.length}`);
  console.log(`Dead / Broken games (403, 404, 500): ${broken.length}`);

  fs.writeFileSync('scripts/audit_results_viable.json', JSON.stringify(viable, null, 2), 'utf8');
  fs.writeFileSync('games_pending_repair.json', JSON.stringify(results, null, 2), 'utf8');
}

runAudit();
