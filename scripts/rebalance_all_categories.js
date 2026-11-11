const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const explicitCategories = {
  'among-us': 'Estrategia',
  'arx-fatalis': 'Aventura',
  'beatblock': 'Casual',
  'brotato': 'Disparos',
  'chasm-the-rift': 'Disparos',
  'clustertruck': 'Plataformas',
  'commander-keen': 'Plataformas',
  'createrria': 'Sandbox',
  'deltarune-chapters-1-4': 'Aventura',
  'descent': 'Disparos',
  'dokdo': 'Aventura',
  'doki-doki-literature-club-plus': 'Terror',
  'dune-ii': 'Estrategia',
  'f1-race': 'Carreras',
  'faster-than-light-demo': 'Estrategia',
  'fez': 'Plataformas',
  'gravity-defied': 'Carreras',
  'happy-room': 'Casual',
  'helltaker': 'Puzzle',
  'heroes-of-might-and-magic-ii': 'Estrategia',
  'hexen-ii': 'Disparos',
  'homeworld': 'Estrategia',
  'how-to-fish': 'Casual',
  'inscryption': 'Terror',
  'kingdom-rush': 'Estrategia',
  'legend-of-legaia': 'Aventura',
  'lego-island': 'Aventura',
  'lego-racers': 'Carreras',
  'lethal-company': 'Terror',
  'limbo': 'Plataformas',
  'outrun': 'Carreras',
  'ridge-racer': 'Carreras',
  'wipeout': 'Carreras',
  'slender': 'Terror',
  'silent-hill': 'Terror',
  'resident-evil': 'Terror',
  'undertale': 'Aventura',
  'cave-story': 'Aventura',
  'vibe-slops-ii': 'Disparos',
  'bulletballet': 'Disparos',
  'the-specialists': 'Disparos'
};

games.forEach(g => {
  if (explicitCategories[g.id]) {
    g.category = explicitCategories[g.id];
  } else {
    const s = (g.id + ' ' + g.title).toLowerCase();
    if (s.includes('racer') || s.includes('racing') || s.includes('drift') || s.includes('moto') || s.includes('speed') || s.includes('drive')) {
      g.category = 'Carreras';
    } else if (s.includes('horror') || s.includes('fear') || s.includes('ghost') || s.includes('fnaf') || s.includes('nightmare')) {
      g.category = 'Terror';
    } else if (s.includes('quest') || s.includes('story') || s.includes('chronicle') || s.includes('island') || s.includes('tale')) {
      g.category = 'Aventura';
    } else if (s.includes('jump') || s.includes('run') || s.includes('dash') || s.includes('boy') || s.includes('land')) {
      g.category = 'Plataformas';
    } else if (s.includes('war') || s.includes('strategy') || s.includes('defense') || s.includes('tower') || s.includes('command')) {
      g.category = 'Estrategia';
    } else if (s.includes('shoot') || s.includes('arena') || s.includes('assault') || s.includes('sniper') || s.includes('combat')) {
      g.category = 'Disparos';
    }
  }
});

const counts = {};
games.forEach(g => counts[g.category] = (counts[g.category] || 0) + 1);
console.log('Categories after complete curation:', counts);

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
