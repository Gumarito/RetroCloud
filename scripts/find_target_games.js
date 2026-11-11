const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const targets = [
  'doom', 'brutal-doom', 'doom-3',
  'super-mario-64',
  'tekken',
  'simpsons',
  'naruto',
  'cuphead',
  'celeste',
  'half-life',
  'tetris',
  'cookie-clicker',
  'sonic',
  'plants-vs-zombies',
  'call-of-duty',
  'counter-strike',
  'dos.zone'
];

console.log('--- Matching Games in games.json ---');
games.forEach(g => {
  const match = targets.find(t => 
    g.id.toLowerCase().includes(t) || 
    g.title.toLowerCase().includes(t) || 
    (g.url && g.url.toLowerCase().includes(t))
  );
  if (match) {
    console.log(`[${g.id}] "${g.title}"`);
    console.log(`  URL: ${g.url}`);
    console.log(`  Image: ${g.image}`);
    console.log(`  LaunchMode: ${g.launchMode || 'iframe'}`);
    console.log(`  Controls:`, g.controls);
    console.log(`  Category: ${g.category}, Tags: ${JSON.stringify(g.tags)}`);
  }
});
