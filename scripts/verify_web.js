const http = require('http');

http.get('http://localhost:3000/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Contains theme-light:', d.includes('theme-light'));
    console.log('Contains themeToggleBtn:', d.includes('themeToggleBtn'));
    console.log('Contains Plataformas filter:', d.includes('data-filter="Plataformas"'));
    console.log('Contains scrollbar suppression:', d.includes('scrollbar-none::-webkit-scrollbar'));
  });
}).on('error', e => console.log('Error:', e.message));
