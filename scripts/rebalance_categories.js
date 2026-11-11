const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const fightKeywords = ['tekken', 'street fighter', 'mortal kombat', 'smash', 'lucha', 'kof', 'king of fighters', 'dragon ball', 'naruto', 'guilty gear', 'marvel vs', 'tekken'];
const racingKeywords = ['kart', 'racing', 'carreras', 'f-zero', 'need for speed', 'outrun', 'gran turismo', 'ridge racer', 'wipeout', 'driver', 'motor', 'moto'];
const shooterKeywords = ['doom', 'half-life', 'quake', 'strike', 'duty', 'metal slug', 'wolfenstein', 'shoot', 'gun', 'fps', 'disparos', 'halo', 'sniper', 'specialists'];
const horrorKeywords = ['terror', 'horror', 'evil', 'silent hill', 'slender', 'fnaf', 'freddy', 'alone in the dark', 'parasite eve'];
const platformKeywords = ['mario', 'sonic', 'celeste', 'cuphead', 'kirby', 'donkey kong', 'rayman', 'megaman', 'mega man', 'crash', 'spyro', 'banjo', 'plataformas', 'hollow knight', 'shovel knight', 'subway'];
const adventureKeywords = ['zelda', 'castlevania', 'metroid', 'tomb raider', 'drascula', 'monkey island', 'aventura', 'final fantasy', 'pokemon', 'chrono', 'golden sun', 'rpg'];
const strategyKeywords = ['plants vs', 'zombies', 'advance wars', 'fire emblem', 'tactics', 'estrategia', 'worms', 'warcraft', 'starcraft'];
const sandboxKeywords = ['minecraft', 'gta', 'grand theft auto', 'simpsons', 'sandbox', 'terraria', 'roblox'];
const puzzleKeywords = ['puzzle', 'tetris', 'bejeweled', 'dr. mario', 'puyo', 'lemings', 'baba', 'sokoban', 'wordle', '2048', 'minesweeper', 'buscaminas', 'solitario'];
const sportsKeywords = ['soccer', 'fifa', 'nba', 'tony hawk', 'skate', 'tennis', 'golf', 'deportes', 'sports', 'wwe', 'wwf', 'boxing', 'boxeo'];

games.forEach(g => {
  const str = (g.id + ' ' + g.title + ' ' + (g.summary || '') + ' ' + (Array.isArray(g.tags) ? g.tags.join(' ') : '')).toLowerCase();
  
  if (fightKeywords.some(k => str.includes(k))) {
    g.category = 'Lucha';
  } else if (racingKeywords.some(k => str.includes(k))) {
    g.category = 'Carreras';
  } else if (shooterKeywords.some(k => str.includes(k))) {
    g.category = 'Disparos';
  } else if (horrorKeywords.some(k => str.includes(k))) {
    g.category = 'Terror';
  } else if (platformKeywords.some(k => str.includes(k))) {
    g.category = 'Plataformas';
  } else if (strategyKeywords.some(k => str.includes(k))) {
    g.category = 'Estrategia';
  } else if (sandboxKeywords.some(k => str.includes(k))) {
    g.category = 'Sandbox';
  } else if (adventureKeywords.some(k => str.includes(k))) {
    g.category = 'Aventura';
  } else if (sportsKeywords.some(k => str.includes(k))) {
    g.category = 'Deportes';
  } else if (puzzleKeywords.some(k => str.includes(k))) {
    g.category = 'Puzzle';
  }
});

const counts = {};
games.forEach(g => counts[g.category] = (counts[g.category] || 0) + 1);
console.log('New balanced category counts:', counts);

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
