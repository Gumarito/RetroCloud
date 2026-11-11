const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
console.log('Sample game with votes:', games[0].id, 'likes:', games[0].likes, 'dislikes:', games[0].dislikes);

// Check that no game in games.json has rating anymore
const hasRating = games.filter(g => g.rating !== undefined);
console.log('Games still having rating in games.json:', hasRating.length);
