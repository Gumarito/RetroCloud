const fs = require('fs');

const js = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.js', 'utf8');

const idx = js.indexOf('function __registerKeyEventCallback');
console.log(js.slice(idx + 800, idx + 1800));
