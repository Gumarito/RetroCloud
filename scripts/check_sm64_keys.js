const fs = require('fs');
const js = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.js', 'utf8');
const idx = js.indexOf('function __findEventTarget(');
console.log(js.substring(idx, idx + 600));
