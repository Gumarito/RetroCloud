const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// 1. Super Mario 64 -> Local clean WASM (0 alerts, 0 third party dialogs)
const sm64 = games.find(g => g.id === 'super-mario-64');
if (sm64) {
  sm64.launchMode = 'iframe';
  sm64.url = './games/super-mario-64/';
  sm64.mirrors = [
    {
      name: 'RetroCloud Motor Nativo (WASM 60FPS sin anuncios)',
      url: './games/super-mario-64/'
    },
    {
      name: 'Mirror Secundario (sm64-main)',
      url: 'https://rgc.zone/ports/sm64-main/index.html'
    }
  ];
  sm64.status = 'online';
  console.log('Super Mario 64 updated to clean local WASM!');
}

// 2. Minecraft 1.8.8 -> Directory trailing slash to fix npx serve / static server redirect loop
const mc = games.find(g => g.id === 'minecraft-1-8-8');
if (mc) {
  mc.launchMode = 'iframe';
  mc.url = './games/minecraft-1-8-8/';
  mc.mirrors = [
    {
      name: 'RetroCloud Local Engine (WASM Nativo)',
      url: './games/minecraft-1-8-8/'
    }
  ];
  mc.status = 'online';
  console.log('Minecraft 1.8.8 updated with directory trailing slash!');
}

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
console.log('games.json updated successfully!');
