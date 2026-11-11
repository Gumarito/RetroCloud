const fs = require('fs');

const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));

// 1. Añadir Kerbal Space Program si no existe
const hasKsp = games.some(g => g.id === 'kerbal-space-program');
if (!hasKsp) {
  games.unshift({
    id: "kerbal-space-program",
    title: "Kerbal Space Program (KSP Web)",
    category: "Simulación",
    collection: "ports",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220200/header.jpg",
    launchMode: "iframe",
    url: "https://ksp.ishotupa.school",
    status: "online",
    featured: true,
    tags: ["Web Native", "Simulación", "Espacio", "PC Clásico"],
    controls: {
      "Aceleración": "Shift (Subir) / Ctrl (Bajar)",
      "Orientación": "WASD / Q y E (Roll)",
      "Activar Etapa": "Barra Espaciadora",
      "Mapa Orbital": "Tecla M"
    },
    summary: "Simulador aeroespacial completo en WebAssembly. Construye naves, cohetes y sondas con física orbital real y soporte para mods vía CKAN integrado.",
    note: "🚀 Incluye gestor de mods CKAN integrado. Puedes instalar piezas adicionales o lanzar directamente el juego base.",
    mirrors: [
      {
        name: "Servidor 1 (CKAN Web Edition)",
        url: "https://ksp.ishotupa.school",
        status: "online"
      }
    ]
  });
  console.log('Añadido Kerbal Space Program al catálogo.');
}

// 2. Añadir Horsey Game
const hasHorsey = games.some(g => g.id === 'horsey-game');
if (!hasHorsey) {
  games.push({
    id: "horsey-game",
    title: "Horsey Game",
    category: "Indie",
    collection: "indie",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop&q=80",
    launchMode: "iframe",
    url: "https://woahhcrackers.github.io/HorseyGameWeb/",
    status: "online",
    featured: false,
    tags: ["Web Native", "Indie", "Casual"],
    controls: {
      "Moverse": "WASD / Flechas",
      "Saltar": "Espacio"
    },
    summary: "Divertido juego indie de plataformas en WebAssembly limpio creado por woahhcrackers.",
    mirrors: [
      {
        name: "Servidor 1 (GitHub Pages Limpio)",
        url: "https://woahhcrackers.github.io/HorseyGameWeb/",
        status: "online"
      }
    ]
  });
  console.log('Añadido Horsey Game al catálogo.');
}

// 3. Actualizar GTA 3 con la nota técnica de 860MB y status online
const gta = games.find(g => g.id === 'gta-3');
if (gta) {
  gta.status = 'online';
  gta.note = "⚡ Port WebAssembly de Alta Fidelidad (~860 MB de datos). La primera descarga puede tomar entre 1 y 3 minutos en inicializar texturas y audio en la memoria RAM. Recomendado en PC y Wi-Fi de alta velocidad.";
  console.log('Actualizado GTA 3 con nota de alto rendimiento y estado online.');
}

fs.writeFileSync('games.json', JSON.stringify(games, null, 2), 'utf8');
console.log(`Catálogo actualizado con éxito. Total juegos: ${games.length}`);
