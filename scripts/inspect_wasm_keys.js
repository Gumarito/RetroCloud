const fs = require('fs');

const wasmBuf = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.wasm');
const str = wasmBuf.toString('binary');

// Search for controller configuration or strings
const searchTerms = ['Enter', 'Return', 'Space', 'Z_TRIG', 'A_BUTTON', 'B_BUTTON', 'START', 'keyboard'];
searchTerms.forEach(term => {
  let count = 0;
  let idx = 0;
  while ((idx = str.indexOf(term, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`[${term}] at ${idx}:`, str.slice(Math.max(0, idx - 30), idx + 50).replace(/[^a-zA-Z0-9_\-\s:\.,]/g, ' '));
    }
    idx += term.length;
  }
  console.log(`Term "${term}" found ${count} times`);
});
