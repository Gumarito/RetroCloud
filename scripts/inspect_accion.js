const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// We can check summary and title
games.forEach(g => {
  const text = (g.title + ' ' + (g.tags || []).join(' ')).toLowerCase();
  // If it wasn't caught
  if (['20 minutes till dawn', 'ages of conflict', 'bad eggs', 'boxhead', 'bloons', 'binding of isaac'].some(k => text.includes(k))) {
    console.log(g.id, ':', g.title, '| summary:', (g.summary || '').substring(0, 60));
  }
});
