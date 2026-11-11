const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
matches.forEach((m, idx) => {
  const tag = m.match(/<script\b[^>]*>/i)[0];
  console.log(`Script ${idx} tag:`, tag);
  const code = m.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '');
  console.log(`  Length: ${code.length}`);
  if (tag.includes('application/ld+json')) {
    try {
      JSON.parse(code);
      console.log(`  Script ${idx} is VALID JSON-LD!`);
    } catch (e) {
      console.log(`  Script ${idx} JSON-LD ERROR:`, e.message);
    }
  } else if (!tag.includes('src=')) {
    try {
      new Function(code);
      console.log(`  Script ${idx} is VALID JS!`);
    } catch (e) {
      console.log(`  Script ${idx} JS ERROR:`, e.message);
    }
  }
});
