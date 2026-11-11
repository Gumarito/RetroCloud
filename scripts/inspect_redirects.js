const fs = require('fs');
const audit = JSON.parse(fs.readFileSync('audit_full_176.json', 'utf8'));

async function inspectRedirects() {
  for (const r of audit.redirectsToPortalRoot) {
    try {
      const res = await fetch(r.redirectsTo, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || '';
      const hasCanvas = html.includes('<canvas');
      const linkCount = (html.match(/<a /gi) || []).length;
      console.log(`[${r.id}] ${r.title}`);
      console.log(`   Final URL: ${r.redirectsTo}`);
      console.log(`   Title: "${title}" | Canvas: ${hasCanvas} | Links: ${linkCount}`);
    } catch(e) {
      console.log(`[${r.id}] Error: ${e.message}`);
    }
  }
}
inspectRedirects();
