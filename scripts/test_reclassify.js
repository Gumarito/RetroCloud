const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

function classifyGame(g) {
  const text = (g.title + ' ' + (g.tags || []).join(' ') + ' ' + (g.summary || '')).toLowerCase();
  
  // Terror
  if (text.includes('fnaf') || text.includes('freddy') || text.includes('terror') || text.includes('horror') || text.includes('zombie') || text.includes('scary') || text.includes('slender') || text.includes('granny') || text.includes('outlast')) {
    return 'Terror';
  }
  // Disparos / FPS
  if (text.includes('doom') || text.includes('half-life') || text.includes('counter strike') || text.includes('cs 1.6') || text.includes('quake') || text.includes('call of duty') || text.includes('fps') || text.includes('disparos') || text.includes('shooter') || text.includes('sniper') || text.includes('wolfenstein') || text.includes('duke nukem')) {
    return 'Disparos';
  }
  // Lucha / Fighting
  if (text.includes('tekken') || text.includes('naruto') || text.includes('mortal kombat') || text.includes('street fighter') || text.includes('lucha') || text.includes('boxing') || text.includes('dragon ball') || text.includes('smash') || text.includes('wwe')) {
    return 'Lucha';
  }
  // Carreras / Racing
  if (text.includes('racing') || text.includes('carreras') || text.includes('drift') || text.includes('moto') || text.includes('kart') || text.includes('burnout') || text.includes('velocidad') || text.includes('need for speed') || text.includes('stunts') || text.includes('car')) {
    return 'Carreras';
  }
  // Deportes / Sports
  if (text.includes('pes ') || text.includes('fifa') || text.includes('soccer') || text.includes('futbol') || text.includes('tennis') || text.includes('skate') || text.includes('deportes') || text.includes('sports') || text.includes('basketball') || text.includes('nba') || text.includes('tony hawk')) {
    return 'Deportes';
  }
  // Plataformas
  if (text.includes('mario') || text.includes('sonic') || text.includes('celeste') || text.includes('cuphead') || text.includes('geometry dash') || text.includes('plataformas') || text.includes('platform') || text.includes('jump') || text.includes('flappy') || text.includes('parkour') || text.includes('crash')) {
    return 'Plataformas';
  }
  // Sandbox / Mundo Abierto
  if (text.includes('minecraft') || text.includes('gta') || text.includes('vice city') || text.includes('sandbox') || text.includes('mundo abierto') || text.includes('open world') || text.includes('simpsons: hit & run') || text.includes('simulador')) {
    return 'Sandbox';
  }
  // Puzzle & Estrategia
  if (text.includes('tetris') || text.includes('puzzle') || text.includes('rompecabezas') || text.includes('2048') || text.includes('chess') || text.includes('ajedrez') || text.includes('estrategia') || text.includes('strategy') || text.includes('generals') || text.includes('command & conquer') || text.includes('plants vs') || text.includes('tower defense') || text.includes('conflict')) {
    return 'Puzzle';
  }
  // Casual & Incremental
  if (text.includes('cookie clicker') || text.includes('clicker') || text.includes('casual') || text.includes('idle') || text.includes('arcade') || text.includes('pac-man') || text.includes('snake')) {
    return 'Casual';
  }
  // Aventura / RPG
  if (text.includes('zelda') || text.includes('pokemon') || text.includes('rpg') || text.includes('aventura') || text.includes('adventure') || text.includes('quest') || text.includes('dungeon') || text.includes('morrowind') || text.includes('daggerfall')) {
    return 'Aventura';
  }
  // Retro Clásicos
  if (text.includes('dos') || text.includes('retro') || text.includes('arcade') || text.includes('scumm') || text.includes('199') || text.includes('198')) {
    return 'Retro';
  }

  return 'Acción';
}

const counts = {};
games.forEach(g => {
  const cat = classifyGame(g);
  counts[cat] = (counts[cat] || 0) + 1;
});

console.log('Category breakdown for 236 games:');
console.log(counts);
