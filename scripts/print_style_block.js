const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
if (styleMatch) {
  console.log(styleMatch[1]);
}
