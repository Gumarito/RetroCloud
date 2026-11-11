const fs = require('fs');

const js = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.js', 'utf8');

const idx = js.indexOf('function __registerKeyEventCallback');
if (idx !== -1) {
  console.log(js.slice(idx, idx + 1200));
} else {
  console.log('not found');
}
