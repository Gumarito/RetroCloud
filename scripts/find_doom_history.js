const fs = require('fs');

const backups = fs.readdirSync('.').filter(f => f.includes('backup') || f.includes('games'));
console.log('Files:', backups);

// Check if git history has doom
