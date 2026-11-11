const fs = require('fs');

// 1. Update games.json
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
let pendingRepair = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

// DOOM 1993
const doom = games.find(g => g.id === 'doom');
if (doom) {
  doom.image = 'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg';
  doom.launchMode = 'external';
  doom.note = '';
  doom.title = 'DOOM (1993)';
}

// Brutal Doom
const brutalDoom = games.find(g => g.id === 'brutal-doom');
if (brutalDoom) {
  brutalDoom.image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2280/header.jpg';
  brutalDoom.note = '';
}

// Half-Life
const hl = games.find(g => g.id === 'half-life');
if (hl) {
  hl.url = './games/half-life/';
  hl.launchMode = 'iframe';
  hl.note = '';
}

// Simpsons Hit & Run
const simpsons = games.find(g => g.id === 'simpsons-hit-and-run');
if (simpsons) {
  simpsons.note = '';
}

// Remove Cuphead to pending repair
const activeGames = [];
games.forEach(g => {
  if (g.id === 'cuphead') {
    console.log('Moving cuphead to games_pending_repair.json');
    pendingRepair.push({
      ...g,
      archivedReason: 'Build Unity WebGL de 1.3GB no viable en navegador web por cuotas de GitHub raw'
    });
  } else {
    // Clear any lingering technical notes from all games so cards stay clean
    if (g.note && (g.note.includes('WASM') || g.note.includes('SharedArrayBuffer') || g.note.includes('RAM') || g.note.includes('lanzador') || g.note.includes('servidor'))) {
      g.note = '';
    }
    activeGames.push(g);
  }
});

fs.writeFileSync('games.json', JSON.stringify(activeGames, null, 2), 'utf8');
fs.writeFileSync('games_pending_repair.json', JSON.stringify(pendingRepair, null, 2), 'utf8');
console.log('games.json and games_pending_repair.json updated successfully.');
