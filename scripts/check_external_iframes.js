const fs = require('fs');
const https = require('https');
const http = require('http');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const externalGames = games.filter(g => g.launchMode === 'external');

console.log(`Analyzing iframe embeddability for ${externalGames.length} external games in parallel...`);

async function checkIframeSupport(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(url, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        timeout: 4000
      }, res => {
        const xfo = res.headers['x-frame-options'];
        const csp = res.headers['content-security-policy'] || '';
        const blocksIframe = !!xfo || csp.includes('frame-ancestors');
        resolve({
          status: res.statusCode,
          blocksIframe,
          xfo,
          hasCspBlock: csp.includes('frame-ancestors')
        });
      });
      req.on('error', e => resolve({ error: e.message }));
      req.on('timeout', () => { req.destroy(); resolve({ timeout: true }); });
      req.end();
    } catch(e) {
      resolve({ error: e.message });
    }
  });
}

(async () => {
  const canBeIframe = [];
  const blocked = [];
  const dead = [];

  const batchSize = 15;
  for (let i = 0; i < externalGames.length; i += batchSize) {
    const batch = externalGames.slice(i, i + batchSize);
    await Promise.all(batch.map(async (g) => {
      const res = await checkIframeSupport(g.url);
      if (res.status === 200 || res.status === 301 || res.status === 302) {
        if (!res.blocksIframe) {
          canBeIframe.push({ id: g.id, title: g.title, url: g.url });
        } else {
          blocked.push({ id: g.id, title: g.title, url: g.url, xfo: res.xfo });
        }
      } else {
        dead.push({ id: g.id, title: g.title, url: g.url, status: res.status, error: res.error, timeout: res.timeout });
      }
    }));
  }

  console.log('--- RESULTS ---');
  console.log(`Can directly embed in iframe (0 external redirect!): ${canBeIframe.length}`);
  console.log(`Blocked by X-Frame-Options / frame-ancestors: ${blocked.length}`);
  console.log(`Dead / Unreachable / 404: ${dead.length}`);

  fs.writeFileSync('scripts/iframe_audit.json', JSON.stringify({ canBeIframe, blocked, dead }, null, 2));
})();
