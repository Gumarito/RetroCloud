const fs = require('fs');

const js = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.js', 'utf8');

const matches = [];
['keydown', 'keyup', 'keypress', 'canvas', 'focus', 'blur'].forEach(term => {
  let idx = 0;
  while ((idx = js.indexOf(term, idx)) !== -1) {
    matches.push({ term, snippet: js.slice(Math.max(0, idx - 40), idx + 80) });
    idx += term.length;
    if (matches.length > 20) break;
  }
});

console.log('Matches found:', matches.length);
matches.slice(0, 10).forEach(m => console.log(`[${m.term}] ->`, m.snippet.replace(/\n/g, ' ')));
