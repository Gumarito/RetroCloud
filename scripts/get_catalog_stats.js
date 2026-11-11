const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const repair = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

console.log('Active games:', games.length);
console.log('Pending repair games:', repair.length);

const modes = {};
games.forEach(g => {
  const m = g.launchMode || 'iframe';
  modes[m] = (modes[m] || 0) + 1;
});
console.log('Launch modes in active games:', modes);

const origins = {};
games.forEach(g => {
  try {
    const host = g.url.startsWith('./') ? 'local' : new URL(g.url).hostname;
    origins[host] = (origins[host] || 0) + 1;
  } catch(e) {
    origins['invalid'] = (origins['invalid'] || 0) + 1;
  }
});
console.log('Top host origins:', Object.entries(origins).sort((a,b)=>b[1]-a[1]).slice(0, 10));
