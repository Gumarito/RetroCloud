const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('HTML length:', html.length);
console.log('Has dark class in <html>:', html.includes('<html lang="es" class="dark">') || html.includes('class="dark"'));
console.log('Theme references:', html.match(/prefers-color-scheme|toggleTheme|setTheme|dark:/g));
console.log('Recent games section found at:', html.indexOf('Continuar jugando'));
console.log('categoryFilter found at:', html.indexOf('categoryFilter') > -1);
