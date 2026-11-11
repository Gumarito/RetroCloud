const fs = require('fs');

const activeGames = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const viableGames = JSON.parse(fs.readFileSync('scripts/audit_results_viable.json', 'utf8'));
const allPending = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

console.log(`Active games before merge: ${activeGames.length}`);
console.log(`Viable games to evaluate: ${viableGames.length}`);

const activeIds = new Set(activeGames.map(g => String(g.id)));
let addedCount = 0;
const mergedGames = [...activeGames];

viableGames.forEach(v => {
  if (!activeIds.has(String(v.id))) {
    // Sanitize title
    let title = v.title
      .replace(/\s*\(HTML5\)/gi, '')
      .replace(/\s*\(Web Port\)/gi, '')
      .replace(/\s*\(WASM\)/gi, '')
      .trim();

    // Prepare clean game object
    const cleanGame = {
      id: v.id,
      title: title,
      category: v.category || 'Aventura',
      image: v.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      url: v.url,
      launchMode: v.canIframe ? 'iframe' : 'external',
      status: 'online',
      mobileReady: v.mobileReady || false,
      tags: Array.isArray(v.tags) && v.tags.length > 0 ? v.tags : [v.category || 'Clásico'],
      controls: v.controls || {
        standardControls: 'WASD / Flechas para moverte · Ratón para interactuar'
      },
      featured: false,
      mirrors: [
        {
          name: 'Servidor 1 (Principal)',
          url: v.url,
          status: 'online'
        }
      ]
    };

    mergedGames.push(cleanGame);
    activeIds.add(String(v.id));
    addedCount++;
    console.log(`+ Added: ${cleanGame.title} (${cleanGame.id}) [${cleanGame.launchMode}]`);
  } else {
    console.log(`~ Skipped duplicate: ${v.title} (${v.id})`);
  }
});

// Update games_pending_repair.json to only contain the truly broken / dead games
const remainingBroken = allPending.filter(p => !activeIds.has(String(p.id)));

fs.writeFileSync('games.json', JSON.stringify(mergedGames, null, 2), 'utf8');
fs.writeFileSync('games_pending_repair.json', JSON.stringify(remainingBroken, null, 2), 'utf8');

console.log(`\nMerge finished!`);
console.log(`Active games now: ${mergedGames.length} (+${addedCount} new games)`);
console.log(`Pending broken games left: ${remainingBroken.length}`);
