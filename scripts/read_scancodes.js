const fs = require('fs');

const wasmBuf = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.wasm');
const str = wasmBuf.toString('binary');

const idx = str.indexOf('key_stickright');
const slice = wasmBuf.slice(idx + 'key_stickright'.length, idx + 'key_stickright'.length + 100);
console.log('Hex dump after key_stickright:');
console.log(slice.toString('hex').match(/../g).join(' '));

// Also let's search for "sm64config.txt" in local storage or file system:
console.log('Index of sm64config.txt:', str.indexOf('sm64config.txt'));
