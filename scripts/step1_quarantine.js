const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const pending = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

const competitorGames = [];
const cleanGames = [];

games.forEach(g => {
  const u = g.url || g.file || '';
  if (u.includes('gn-math.dev') || g.id === 'wasm-rip') {
    competitorGames.push({
      ...g,
      quarantinedAt: new Date().toISOString(),
      quarantineReason: g.id === 'wasm-rip' ? 'Portal website falso juego' : 'gn-math.dev portal de competidor con publicidad y barras ajenas'
    });
  } else {
    cleanGames.push(g);
  }
});

console.log(`Juegos analizados: ${games.length}`);
console.log(`Juegos en cuarentena: ${competitorGames.length}`);
console.log(`Juegos limpios retenidos: ${cleanGames.length}`);

// Merge into pending repair without duplicate IDs
const pendingMap = new Map();
pending.forEach(p => pendingMap.set(p.id, p));
competitorGames.forEach(c => pendingMap.set(c.id, c));

const updatedPending = Array.from(pendingMap.values());

fs.writeFileSync('games.json', JSON.stringify(cleanGames, null, 2), 'utf8');
fs.writeFileSync('games_pending_repair.json', JSON.stringify(updatedPending, null, 2), 'utf8');

console.log(`Guardado games.json: ${cleanGames.length} juegos.`);
console.log(`Guardado games_pending_repair.json: ${updatedPending.length} juegos.`);
