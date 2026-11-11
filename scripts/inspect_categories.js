const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const catCounts = {};
const tagCounts = {};

games.forEach(g => {
  const cat = g.category || 'Sin categoría';
  catCounts[cat] = (catCounts[cat] || 0) + 1;
  if (Array.isArray(g.tags)) {
    g.tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  }
});

console.log('Total games:', games.length);
console.log('Categories:', catCounts);
console.log('Top tags:', Object.entries(tagCounts).sort((a,b)=>b[1]-a[1]).slice(0, 20));
