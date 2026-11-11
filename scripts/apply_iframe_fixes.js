const fs = require('fs');

let games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// 1. Remove the competitor entry 'wasm-arcade'
const beforeLen = games.length;
games = games.filter(g => g.id !== 'wasm-arcade');
if (games.length < beforeLen) {
  console.log('Removed competitor entry "wasm-arcade"');
}

// 2. Configure minecraft-1-8-8 as local self-hosted iframe game
const mc = games.find(g => g.id === 'minecraft-1-8-8');
if (mc) {
  mc.launchMode = 'iframe';
  mc.url = './games/minecraft-1-8-8/index.html';
  mc.mirrors = [
    {
      name: 'RetroCloud Local Engine (WASM Nativo)',
      url: './games/minecraft-1-8-8/index.html'
    }
  ];
  mc.status = 'online';
  console.log('minecraft-1-8-8 updated to local iframe!');
}

// 3. Convert verified external games to iframe
const iframeDirectIds = [
  'naruto-shippuden-ultimate-ninja-5',
  'burnout-3-takedown',
  'simpsons-hit-and-run',
  'skate-3',
  'subway-surfers',
  'crash-nitro-kart',
  'ncaa-football-10',
  'tony-hawk-s-pro-skater-3',
  'wwii-gi'
];

iframeDirectIds.forEach(id => {
  const g = games.find(x => x.id === id);
  if (g) {
    g.launchMode = 'iframe';
    g.status = 'online';
    console.log(`Converted ${g.id} (${g.title}) to iframe!`);
  }
});

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
console.log('games.json saved successfully!');
