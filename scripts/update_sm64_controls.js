const fs = require('fs');
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const sm64 = games.find(g => g.id === 'super-mario-64');
if (sm64) {
  sm64.controls = {
    "Start": "Enter / Espacio",
    "Moverse": "Flechas / WASD",
    "A (Saltar)": "Espacio / L",
    "B (Golpe)": "C / Coma (,)",
    "Z (Agacharse)": "Z / K"
  };
  fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
  console.log('Updated super-mario-64 controls in games.json');
}
