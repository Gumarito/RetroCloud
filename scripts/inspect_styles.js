const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
if (styleMatch) {
  styleMatch.forEach((s, idx) => console.log(`Style block ${idx}: length ${s.length}\n${s.slice(0, 500)}...`));
} else {
  console.log('No style blocks found');
}
