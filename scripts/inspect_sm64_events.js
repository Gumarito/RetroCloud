const fs = require('fs');

const js = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.js', 'utf8');

const regex = /addEventListener\(['"]([a-zA-Z]+)['"]/g;
let m;
const events = new Set();
while ((m = regex.exec(js)) !== null) {
  events.add(m[1]);
}
console.log('Registered events in sm64 JS:', Array.from(events));

// Search for strings containing Enter, Return, Start, or Space
const enterRegex = /"Enter"|"Return"|"Space"|"Key[A-Z]"/g;
const keyNames = new Set();
while ((m = enterRegex.exec(js)) !== null) {
  keyNames.add(m[0]);
}
console.log('Key names:', Array.from(keyNames));
