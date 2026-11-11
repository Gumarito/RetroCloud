const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
const pending = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));

// 1. FNAF configurations
const restoredFnafs = [
  {
    id: "five-nights-at-freddy-s",
    title: "Five Nights at Freddy's",
    category: "Terror",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/319510/header.jpg",
    url: "https://dorukyum.github.io/FNAF-Web/",
    launchMode: "iframe",
    status: "online",
    mobileReady: true,
    tags: ["Web Native", "Terror", "Táctil", "mobile-ready"],
    controls: {
      "Interactuar": "Click Ratón / Touch",
      "Cámaras": "Puntero inferior de pantalla",
      "Luces y Puertas": "Botones laterales rojos y blancos"
    },
    featured: true,
    mirrors: [
      {
        name: "Servidor 1 (Limpio GitHub Pages)",
        url: "https://dorukyum.github.io/FNAF-Web/",
        status: "online"
      }
    ]
  },
  {
    id: "five-nights-at-freddy-s-2",
    title: "Five Nights at Freddy's 2",
    category: "Terror",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/332800/header.jpg",
    url: "https://sussygamedeveloper.github.io/FNAF2/",
    launchMode: "iframe",
    status: "online",
    mobileReady: true,
    tags: ["Web Native", "Terror", "Táctil"],
    controls: {
      "Máscara Freddy": "Espacio / Botón máscara",
      "Linterna": "Ctrl / Tecla F",
      "Monitor de Cámaras": "Click derecho / Barra inferior"
    },
    featured: false,
    mirrors: [
      {
        name: "Servidor 1 (Limpio GitHub Pages)",
        url: "https://sussygamedeveloper.github.io/FNAF2/",
        status: "online"
      }
    ]
  },
  {
    id: "five-nights-at-freddy-s-3",
    title: "Five Nights at Freddy's 3",
    category: "Terror",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/354140/header.jpg",
    url: "https://sussygamedeveloper.github.io/fnaf3/",
    launchMode: "iframe",
    status: "online",
    mobileReady: false,
    tags: ["Web Native", "Terror"],
    controls: {
      "Interactuar": "Click Ratón",
      "Reiniciar Sistemas": "Click en Panel de Mantenimiento",
      "Audio Lure": "Panel de Cámaras"
    },
    featured: false,
    mirrors: [
      {
        name: "Servidor 1 (Limpio GitHub Pages)",
        url: "https://sussygamedeveloper.github.io/fnaf3/",
        status: "online"
      }
    ]
  },
  {
    id: "five-nights-at-freddy-s-4",
    title: "Five Nights at Freddy's 4",
    category: "Terror",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/388090/header.jpg",
    url: "https://staticquasar931.github.io/FNAF-4/",
    launchMode: "iframe",
    status: "online",
    mobileReady: false,
    tags: ["Web Native", "Terror"],
    controls: {
      "Moverse a Puertas": "Click en extremos de la habitación",
      "Linterna": "Ctrl / Click",
      "Mantener Puerta Cerrada": "Tecla Shift"
    },
    featured: false,
    mirrors: [
      {
        name: "Servidor 1 (Limpio GitHub Pages)",
        url: "https://staticquasar931.github.io/FNAF-4/",
        status: "online"
      }
    ]
  }
];

// Remove restored IDs from pending
const restoredIds = new Set(restoredFnafs.map(r => r.id));
const updatedPending = pending.filter(p => !restoredIds.has(p.id));

// Add restored to games
restoredFnafs.forEach(rf => {
  const existingIdx = games.findIndex(g => g.id === rf.id);
  if (existingIdx >= 0) {
    games[existingIdx] = rf;
  } else {
    games.push(rf);
  }
});

// 2. Update magic-tower-50-floors
const mt = games.find(g => g.id === 'magic-tower-50-floors');
if (mt) {
  mt.url = 'https://ckcz123.github.io/mota-js/';
  mt.launchMode = 'iframe';
  mt.mirrors = [
    {
      name: 'Servidor 1 (HTML5 OpenSource)',
      url: 'https://ckcz123.github.io/mota-js/',
      status: 'online'
    }
  ];
  mt.controls = {
    "Moverse": "WASD / Flechas de Dirección",
    "Interactuar": "Enter / Espacio",
    "Guardar / Cargar": "Tecla S (Save) / Tecla L (Load)"
  };
}

// 3. Update WASM Arcade external games
const externalIds = ['gta-3', 'kingdom-rush', 'stick-war', 'raft-wars-2', 'xiao-xiao-4-bar-shootout'];
externalIds.forEach(id => {
  const g = games.find(x => x.id === id);
  if (g) {
    g.launchMode = 'external';
    if (g.mirrors && g.mirrors.length > 0) {
      g.mirrors.forEach(m => {
        m.name = 'Servidor Comunitario Aislado (WebPort)';
      });
    } else {
      g.mirrors = [
        {
          name: 'Servidor Comunitario Aislado (WebPort)',
          url: g.url,
          status: 'online'
        }
      ];
    }
  }
});

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
fs.writeFileSync('games_pending_repair.json', JSON.stringify(updatedPending, null, 2), 'utf8');

console.log(`Paso 2 completado con éxito:`);
console.log(`- Juegos limpios en games.json: ${games.length}`);
console.log(`- Juegos en cuarentena restante: ${updatedPending.length}`);
console.log(`- Restaurados FNAF 1, 2, 3, 4 con ports limpios de GitHub Pages.`);
console.log(`- Actualizado Magic Tower con port limpio de Mota-JS.`);
console.log(`- Configurados en launchMode 'external' con Servidor Aislado: ${externalIds.join(', ')}.`);
