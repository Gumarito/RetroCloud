const fs = require('fs');

const js = fs.readFileSync('games/super-mario-64/sm64.us.f3dex2e.js', 'utf8');

// Look for SDL keyboard mappings, keydown, keyup, etc.
const matches = [];
const regex = /SDL2\.keymap|DOM_VK_|SDL_SCANCODE_|SDL_KEYDOWN|SDL_KEYUP/g;
let m;
while ((m = regex.exec(js)) !== null) {
  matches.push(js.slice(Math.max(0, m.index - 50), m.index + 100));
  if (matches.length > 10) break;
}
console.log('Keymap snippets:', matches);

// Also look for controls or default key bindings
const keyBindingSnippet = js.match(/.{0,50}(?:START_BUTTON|CONT_START|Z_TRIG|A_BUTTON|B_BUTTON).{0,50}/g);
console.log('Button snippets:', keyBindingSnippet ? keyBindingSnippet.slice(0, 10) : 'none');
