const fs = require('fs');

const wasmBuf = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.wasm');
const str = wasmBuf.toString('binary');

const idx = str.indexOf('src/pc/configfile.c');
console.log(str.slice(idx - 200, idx + 1200).replace(/[^a-zA-Z0-9_\-\s:\.,=]/g, ' '));
