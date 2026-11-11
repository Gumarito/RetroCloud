const fs = require('fs');

console.log('Testing games.json parsing...');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
console.log('games.json is valid JSON! Count:', games.length);

console.log('Checking specific games in games.json:');
const checkIds = ['doom', 'super-mario-64', 'tekken-5', 'tekken-4', 'simpsons-hit-and-run', 'naruto-shippuden-ultimate-ninja-5', 'cuphead', 'celeste', 'half-life', 'plants-vs-zombies', 'call-of-duty-black-ops-zombies', 'counter-strike-1-6', 'cookie-clicker'];
checkIds.forEach(id => {
  const g = games.find(x => x.id === id);
  if (g) {
    console.log(`✓ [${g.id}] URL: ${g.url}, LaunchMode: ${g.launchMode || 'iframe'}, Saga: ${g.saga || 'none'}, Category: ${g.category}`);
  } else {
    console.log(`✗ [${id}] NOT FOUND!`);
  }
});

console.log('\nTesting index.html script tags for obvious syntax errors...');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Total script tags in index.html:', scriptMatches.length);

scriptMatches.forEach((s, idx) => {
  const code = s.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '');
  if (!s.includes('src=')) {
    try {
      new Function(code);
      console.log(`Script block ${idx}: VALID JS`);
    } catch (e) {
      console.error(`Script block ${idx} ERROR:`, e.message);
    }
  }
});
