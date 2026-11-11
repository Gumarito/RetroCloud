const fs = require('fs');

const wasmBuf = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.wasm');
const str = wasmBuf.toString('binary');

const idx = str.indexOf('controller_emscripten_keyboard_init');
console.log('Snippet around controller_emscripten_keyboard_init:');
console.log(str.slice(Math.max(0, idx - 400), idx + 800).replace(/[^a-zA-Z0-9_\-\s:\.,]/g, ' '));
