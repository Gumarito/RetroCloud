const fs = require('fs');
const html = fs.readFileSync('scripts/celeste_widget.html', 'utf8');
console.log('Includes canvas:', html.includes('<canvas'));
console.log('Includes pico8:', html.includes('pico8'));

const scripts = html.match(/src="[^"]+"/g);
console.log('External scripts:', scripts);
