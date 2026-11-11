const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
let pendingRepair = [];
try {
  pendingRepair = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));
} catch (e) {
  pendingRepair = [];
}

console.log('Current catalog count:', games.length);

// 1. DOOM
const doom = games.find(g => g.id === 'doom');
if (doom) {
  doom.image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2280/header.jpg';
  doom.saga = 'doom';
  doom.controls = {
    'Moverse': 'Flechas / WASD',
    'Disparar': 'Control (Ctrl) / Espacio',
    'Abrir Puertas': 'Espacio',
    'Menú / Pausa': 'ESC',
    'Aceptar Menú': 'Enter'
  };
  doom.note = 'Presiona Enter o Espacio para saltar la intro e iniciar partida.';
}

const brutalDoom = games.find(g => g.id === 'brutal-doom');
if (brutalDoom) brutalDoom.saga = 'doom';
const doom3 = games.find(g => g.id === 'doom-3');
if (doom3) doom3.saga = 'doom';

// 2. Super Mario 64
const sm64 = games.find(g => g.id === 'super-mario-64');
if (sm64) {
  sm64.saga = 'mario';
  sm64.controls = {
    'Moverse': 'Flechas del teclado',
    'Cámara': 'W, A, S, D',
    'Saltar': 'L',
    'Agacharse / Deslizarse': 'Espacio / K',
    'Golpe / Saltar Diálogo': 'C',
    'Start / Pausa': 'Enter'
  };
}

// 3. Tekken Saga
const tekkenGames = games.filter(g => g.id.includes('tekken'));
tekkenGames.forEach(t => {
  t.saga = 'tekken';
  t.category = 'Lucha';
});
const tekken5 = games.find(g => g.id === 'tekken-5');
if (tekken5) {
  tekken5.launchMode = 'external';
  tekken5.note = 'Ejecuta en lanzador de alto rendimiento para evitar restricciones de servidor.';
}
const tekken4 = games.find(g => g.id === 'tekken-4');
if (tekken4) {
  tekken4.launchMode = 'external';
}

// 4. Simpsons Hit & Run
const simpsons = games.find(g => g.id === 'simpsons-hit-and-run');
if (simpsons) {
  simpsons.launchMode = 'external';
  simpsons.note = 'Requiere memoria compartida (SharedArrayBuffer) para audio WASM. Se lanza de forma externa aislada.';
}

// 5. Naruto Shippuden
const naruto5 = games.find(g => g.id === 'naruto-shippuden-ultimate-ninja-5');
if (naruto5) {
  naruto5.saga = 'naruto';
  naruto5.launchMode = 'external';
}
const narutoImpact = games.find(g => g.id === 'naruto-shippuden-ultimate-ninja-impact');
if (narutoImpact) {
  narutoImpact.saga = 'naruto';
  narutoImpact.launchMode = 'external';
}

// 6. Call of Duty Black Ops Zombies
const codBsz = games.find(g => g.id === 'call-of-duty-black-ops-zombies');
if (codBsz) {
  codBsz.saga = 'call-of-duty';
  codBsz.launchMode = 'external';
}
const codMw2 = games.find(g => g.id === 'call-of-duty-modern-warfare-2');
if (codMw2) {
  codMw2.saga = 'call-of-duty';
  codMw2.launchMode = 'external';
}

// 7. Half-Life
const hl = games.find(g => g.id === 'half-life');
if (hl) {
  hl.url = 'https://pixelsuft.github.io/hl/xash.html#150';
  hl.saga = 'half-life';
  hl.note = 'Preconfigurado automáticamente con 150MB RAM para inicio inmediato.';
}

// 8. Plants vs Zombies
const pvz = games.find(g => g.id === 'plants-vs-zombies');
if (pvz) {
  pvz.url = 'https://pvz.ee/iframe.php';
  pvz.category = 'Estrategia';
  pvz.tags = ['Web Native', 'Estrategia', 'Casual', 'Táctil', 'mobile-ready'];
}

// 9. Counter-Strike 1.6
const cs16 = games.find(g => g.id === 'counter-strike-1-6');
if (cs16) {
  cs16.url = 'https://wasm.rip/files/gstrike/index.html';
  cs16.saga = 'counter-strike';
  cs16.controls = {
    'Moverse': 'W, A, S, D',
    'Apuntar / Disparar': 'Ratón (Click Izq)',
    'Saltar': 'Espacio',
    'Comprar': 'B',
    'Recargar': 'R'
  };
  cs16.note = 'Versión limpia sin pantallas de donación y con audio sincronizado.';
}
const csGstrike = games.find(g => g.id === 'counter-strike');
if (csGstrike) {
  csGstrike.saga = 'counter-strike';
}

// 10. Sonic 2013
const sonic = games.find(g => g.id === 'sonic-the-hedgehog');
if (sonic) {
  sonic.saga = 'sonic';
  sonic.launchMode = 'external';
  sonic.note = 'Abre en ventana optimizada para activar el motor WebAudio sin bloqueos del navegador.';
}
const sonic4 = games.find(g => g.id === 'sonic-the-hedgehog-4-episode-i');
if (sonic4) sonic4.saga = 'sonic';

// 11. Celeste
const celeste = games.find(g => g.id === 'celeste');
if (celeste) {
  celeste.url = './games/celeste/';
  celeste.launchMode = 'iframe';
  celeste.note = 'Port local de alta velocidad integrado con el control de volumen.';
}

// 12. Cuphead
const cuphead = games.find(g => g.id === 'cuphead');
if (cuphead) {
  cuphead.url = './games/cuphead/';
  cuphead.launchMode = 'iframe';
  cuphead.note = 'Cargador limpio sin ventanas emergentes de terceros.';
}

// 13. Archive Tetris Classic & Dos.Zone
const toArchiveIds = ['tetris-classic', 'dos-zone'];
const remainingGames = [];
games.forEach(g => {
  if (toArchiveIds.includes(g.id)) {
    console.log(`Archiving [${g.id}] "${g.title}"`);
    pendingRepair.push({
      ...g,
      archivedReason: g.id === 'tetris-classic' ? 'Portada incorrecta e idioma asiatico, scroll en pagina' : 'Portal externo con iframe bloqueado'
    });
  } else {
    remainingGames.push(g);
  }
});

// Sagas adicionales para franquicias conocidas
remainingGames.forEach(g => {
  const t = (g.title + ' ' + g.id).toLowerCase();
  if (!g.saga) {
    if (t.includes('mario') || t.includes('luigi')) g.saga = 'mario';
    else if (t.includes('zelda')) g.saga = 'zelda';
    else if (t.includes('pokemon')) g.saga = 'pokemon';
    else if (t.includes('gta') || t.includes('grand theft auto')) g.saga = 'gta';
    else if (t.includes('sonic')) g.saga = 'sonic';
    else if (t.includes('castlevania')) g.saga = 'castlevania';
    else if (t.includes('metroid')) g.saga = 'metroid';
    else if (t.includes('crash')) g.saga = 'crash';
    else if (t.includes('donkey kong')) g.saga = 'donkey-kong';
    else if (t.includes('mortalkombat') || t.includes('mortal kombat')) g.saga = 'mortal-kombat';
    else if (t.includes('street fighter')) g.saga = 'street-fighter';
  }
});

// Agrupar los juegos de Tekken para que salgan adyacentes
const nonTekken = remainingGames.filter(g => g.saga !== 'tekken');
const tekkenList = remainingGames.filter(g => g.saga === 'tekken');
// Ordenar Tekken: 4, 5, 5 Dark Resurrection
tekkenList.sort((a,b) => a.title.localeCompare(b.title));
// Insertar Tekken juntos en una posición destacada
const finalGames = [...nonTekken.slice(0, 15), ...tekkenList, ...nonTekken.slice(15)];

fs.writeFileSync('games.json', JSON.stringify(finalGames, null, 2), 'utf8');
fs.writeFileSync('games_pending_repair.json', JSON.stringify(pendingRepair, null, 2), 'utf8');
console.log(`Updated games.json: ${finalGames.length} active games. Saved ${pendingRepair.length} in pending repair.`);
