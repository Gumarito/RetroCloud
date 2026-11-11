const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// Curated list of rules and overrides for accurate categorization
const overrides = {
  'minecraft-1-8-8': 'Sandbox',
  'super-mario-64': 'Plataformas',
  'flappy-bird': 'Plataformas',
  'gta-vice-city': 'Sandbox',
  'the-simpsons-hit-run': 'Sandbox',
  'cuphead': 'Plataformas',
  'celeste': 'Plataformas',
  'half-life': 'Disparos',
  'brutal-doom': 'Disparos',
  'tetris': 'Puzzle',
  'cookie-clicker': 'Casual',
  'sonic-the-hedgehog': 'Plataformas',
  'geometry-dash': 'Plataformas',
  'plants-vs-zombies': 'Puzzle',
  'five-nights-at-freddys': 'Terror',
  'call-of-duty-black-ops-zombies': 'Disparos',
  'counter-strike-1-6': 'Disparos',
  '20-minutes-till-dawn': 'Disparos',
  'tekken-5': 'Lucha',
  'naruto-shippuden-ultimate-ninja-5': 'Lucha',
  'subway-surfers': 'Plataformas',
  'hollow-knight': 'Aventura',
  'undertale': 'Aventura',
  'dos-zone': 'Retro'
};

function getGenre(g) {
  if (overrides[g.id]) return overrides[g.id];

  const t = (g.title + ' ' + (g.tags || []).join(' ') + ' ' + (g.summary || '')).toLowerCase();

  // Terror
  if (t.includes('fnaf') || t.includes('freddy') || t.includes('terror') || t.includes('horror') || t.includes('zombie') || t.includes('scary') || t.includes('slender') || t.includes('granny') || t.includes('fears to fathom') || t.includes('haunt') || t.includes('nightmare')) {
    return 'Terror';
  }
  // Lucha
  if (t.includes('tekken') || t.includes('naruto') || t.includes('mortal kombat') || t.includes('street fighter') || t.includes('lucha') || t.includes('fighter') || t.includes('fighting') || t.includes('boxing') || t.includes('dragon ball') || t.includes('smash') || t.includes('wwe')) {
    return 'Lucha';
  }
  // Carreras
  if (t.includes('racing') || t.includes('carreras') || t.includes('drift') || t.includes('moto') || t.includes('kart') || t.includes('burnout') || t.includes('velocidad') || t.includes('need for speed') || t.includes('stunts') || t.includes('drive') || t.includes('highway') || t.includes('car ')) {
    return 'Carreras';
  }
  // Deportes
  if (t.includes('pes ') || t.includes('fifa') || t.includes('soccer') || t.includes('futbol') || t.includes('fútbol') || t.includes('tennis') || t.includes('skate') || t.includes('deportes') || t.includes('sports') || t.includes('basketball') || t.includes('nba') || t.includes('tony hawk') || t.includes('baseball') || t.includes('golf')) {
    return 'Deportes';
  }
  // Disparos / FPS
  if (t.includes('doom') || t.includes('half-life') || t.includes('counter strike') || t.includes('quake') || t.includes('call of duty') || t.includes('fps') || t.includes('disparos') || t.includes('shooter') || t.includes('sniper') || t.includes('wolfenstein') || t.includes('duke nukem') || t.includes('bullet') || t.includes('gun') || t.includes('combat') || t.includes('strike')) {
    return 'Disparos';
  }
  // Plataformas
  if (t.includes('mario') || t.includes('sonic') || t.includes('celeste') || t.includes('cuphead') || t.includes('geometry dash') || t.includes('plataformas') || t.includes('platform') || t.includes('jump') || t.includes('parkour') || t.includes('crash') || t.includes('runner') || t.includes('climb')) {
    return 'Plataformas';
  }
  // Sandbox / Mundo Abierto
  if (t.includes('minecraft') || t.includes('gta') || t.includes('vice city') || t.includes('sandbox') || t.includes('mundo abierto') || t.includes('open world') || t.includes('simpsons: hit & run') || t.includes('simulator') || t.includes('simulador') || t.includes('craft')) {
    return 'Sandbox';
  }
  // Puzzle & Estrategia
  if (t.includes('tetris') || t.includes('puzzle') || t.includes('rompecabezas') || t.includes('2048') || t.includes('chess') || t.includes('ajedrez') || t.includes('estrategia') || t.includes('strategy') || t.includes('generals') || t.includes('command & conquer') || t.includes('plants vs') || t.includes('defense') || t.includes('conflict') || t.includes('logic') || t.includes('tactics')) {
    return 'Puzzle';
  }
  // Aventura & RPG
  if (t.includes('zelda') || t.includes('pokemon') || t.includes('pokémon') || t.includes('rpg') || t.includes('aventura') || t.includes('adventure') || t.includes('quest') || t.includes('dungeon') || t.includes('morrowind') || t.includes('daggerfall') || t.includes('isaac') || t.includes('tale')) {
    return 'Aventura';
  }
  // Casual & Arcade
  if (t.includes('cookie clicker') || t.includes('clicker') || t.includes('casual') || t.includes('idle') || t.includes('pac-man') || t.includes('snake') || t.includes('arcade') || t.includes('ball') || t.includes('pinball') || t.includes('frogger')) {
    return 'Casual';
  }
  // Retro Clásicos
  if (t.includes('dos') || t.includes('retro') || t.includes('scumm') || t.includes('199') || t.includes('198') || t.includes('classic')) {
    return 'Retro';
  }

  return 'Acción';
}

games.forEach(g => {
  g.category = getGenre(g);
  // Also fix dos-zone
  if (g.id === 'dos-zone' || (g.url && g.url.includes('dos.zone'))) {
    g.launchMode = 'external';
    g.category = 'Retro';
    g.mirrors = [
      {
        name: 'Portal Dos.Zone (Abrir en pestaña externa)',
        url: 'https://dos.zone'
      }
    ];
  }
});

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');

const stats = {};
games.forEach(g => stats[g.category] = (stats[g.category] || 0) + 1);
console.log('Successfully reclassified games.json:');
console.log(stats);
