const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const gnGames = games.filter(g => g.url && g.url.includes('gn-math.dev'));
console.log('Total gn-math.dev games:', gnGames.length);

let withAlternative = 0;
let withoutAlternative = 0;

gnGames.forEach(g => {
  const altMirrors = (g.mirrors || []).filter(m => m.url && !m.url.includes('gn-math'));
  if (altMirrors.length > 0) {
    withAlternative++;
    console.log(g.id, 'has alternative mirror:', altMirrors[0].url);
  } else {
    withoutAlternative++;
  }
});

console.log('With alternative mirror:', withAlternative);
console.log('Without alternative mirror:', withoutAlternative);
