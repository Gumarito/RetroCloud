const fs = require('fs');
const path = require('path');

const gamesPath = path.join(__dirname, '..', 'games.json');
const quarantinePath = path.join(__dirname, '..', 'games_pending_repair.json');

const games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
const quarantined = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));

// Target list of IDs that must be quarantined
const quarantineMap = {
  'doom-3': 'Redirige 301 al directorio raíz de competidor (recompiledgames.com)',
  'phantasy-star-online': 'Redirige 301 al directorio raíz de competidor (recompiledgames.com)',
  'flight-of-the-amazon-queen': 'Redirige al portal de juegos scummweb.tsilva.eu/',
  'beneath-a-steel-sky': 'Enlace a portal agregador con lista de juegos (scummweb.tsilva.eu)',
  'drascula-the-vampire-strikes-back': 'Enlace a portal agregador con lista de juegos (scummweb.tsilva.eu)',
  'dos-zone': 'Directorio/portal masivo externo de 241 juegos (dos.zone)',
  'gta-3': 'Contenedor externo con 93 enlaces y cabecera de juegos competidores (wasmarcade.com)',
  'kingdom-rush': 'Agregador de juegos con catálogo externo (wasmarcade.app)',
  'raft-wars-2': 'Agregador de juegos con catálogo externo (wasmarcade.app)',
  'stick-war': 'Agregador de juegos con catálogo externo (wasmarcade.app)',
  'xiao-xiao-4-bar-shootout': 'Agregador de juegos con catálogo externo (wasmarcade.app)',
  'wolfenstein-3d': 'Redirige a la página principal de WAD Commander (wadcmd.com)',
  'wadcmd': 'Página principal de WAD Commander sin juego directo',
  'xrick': 'Redirige a página informativa con 27 enlaces externos (rick-dangerous.org)',
  'dude-simulator': 'Servidor caído (HTTP 503 Netlify)',
  'dude-simulator-2': 'Servidor caído (HTTP 503 Netlify)',
  'luigi-s-picture-poker': 'Bloqueado por límites de itch.io (HTTP 429)',
  'runescape-classic': 'Servidor caído / Error DNS (runescapeclassic.gold)',
  'terraria': 'Servidor fuera de servicio (HTTP 402 Payment Required)'
};

const newQuarantineList = [...quarantined];
const cleanGames = [];
let quarantinedCount = 0;

for (const g of games) {
  if (quarantineMap[g.id]) {
    quarantinedCount++;
    const alreadyExists = newQuarantineList.find(q => q.id === g.id);
    if (!alreadyExists) {
      newQuarantineList.push({
        ...g,
        quarantinedAt: '2026-11-10T05:15:00.000Z',
        quarantineReason: quarantineMap[g.id],
        originalUrl: g.url
      });
    }
  } else {
    cleanGames.push(g);
  }
}

// Ensure backup before writing
fs.writeFileSync(path.join(__dirname, '..', 'backups', `games_backup_${Date.now()}.json`), JSON.stringify(games, null, 2));

fs.writeFileSync(gamesPath, JSON.stringify(cleanGames, null, 2), 'utf8');
fs.writeFileSync(quarantinePath, JSON.stringify(newQuarantineList, null, 2), 'utf8');

console.log('=== PURGA DEFINITIVA COMPLETADA ===');
console.log('Juegos iniciales en games.json:', games.length);
console.log('Juegos purgados en esta sesión:', quarantinedCount);
console.log('Juegos limpios activos en games.json:', cleanGames.length);
console.log('Total en cuarentena (games_pending_repair.json):', newQuarantineList.length);
