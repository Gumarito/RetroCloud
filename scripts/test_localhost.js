const http = require('http');

http.get('http://localhost:3000/', res => {
  console.log('Localhost status:', res.statusCode);
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Loaded length:', data.length);
    console.log('Contains new scrollbar CSS:', data.includes('SUPRESIÓN COMPLETA DE BARRAS DE SCROLL'));
    console.log('Contains line-clamp-2:', data.includes('line-clamp-2'));
    console.log('Contains modalVoteWidget:', data.includes('modalVoteWidget'));
  });
}).on('error', e => console.error('Error connecting to localhost:3000:', e.message));
