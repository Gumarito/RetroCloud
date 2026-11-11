const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

['half-life', 'doom', 'cookie-clicker', 'brutal-doom', 'simpsons-hit-and-run'].forEach(id => {
  const g = games.find(x => x.id === id);
  console.log(`[${id}]:`, {
    title: g?.title,
    url: g?.url,
    image: g?.image,
    launchMode: g?.launchMode,
    note: g?.note
  });
});

console.log('Is Cuphead in active games?', games.some(g => g.id === 'cuphead'));
