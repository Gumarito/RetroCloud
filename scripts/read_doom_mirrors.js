const fs = require('fs');
const backup = JSON.parse(fs.readFileSync('backups/games_20261108_064901.json', 'utf8'));

const doom = backup.find(g => g.id === 'doom');
console.log('Doom mirrors:', doom.mirrors);
