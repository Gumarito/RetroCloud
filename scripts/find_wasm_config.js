const fs = require('fs');

const wasmBuf = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.wasm');

// Search for scancodes or configuration strings in the data section
// Common sm64-port config:
// configKeyA, configKeyB, configKeyStart, etc.
const str = wasmBuf.toString('binary');
const matches = [];
['config', 'button', 'stick', 'start', 'deadzone', 'bind'].forEach(word => {
  let idx = 0;
  while ((idx = str.indexOf(word, idx)) !== -1) {
    const s = str.slice(Math.max(0, idx - 10), idx + 40).replace(/[^a-zA-Z0-9_\-\s]/g, ' ');
    if (s.trim().length > 5) matches.push(s);
    if (matches.length > 25) break;
    idx += word.length;
  }
});

console.log('Matches:', matches.slice(0, 15));
