const fs = require('fs');
const backup = JSON.parse(fs.readFileSync('backups/games_20261108_064901.json', 'utf8'));

const dooms = backup.filter(g => g.id.includes('doom') || g.title.toLowerCase().includes('doom'));
console.log(dooms);
