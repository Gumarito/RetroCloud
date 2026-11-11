const fs = require('fs');
const content = fs.readFileSync('scripts/celeste_widget.html', 'utf8');

const scripts = content.match(/src="[^"]*"/g);
console.log('Scripts:', scripts);
const picoMatch = content.match(/pico8[\w\.\/\?=-]*/g);
console.log('Pico references:', picoMatch ? picoMatch.slice(0, 10) : 'none');
