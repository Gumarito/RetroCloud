const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const cheatsJs = `
        // Base de Datos de Trucos (Cheats) para GTA y juegos compatibles
        const GTA_CHEATS = [
            { code: 'GESUNDHEIT', desc: '100% de Salud (Cura completa inmediata)' },
            { code: 'TORTOISE', desc: '100% de Armadura corporal completa' },
            { code: 'GUNSGUNSGUNS', desc: 'Todas las armas con munición máxima' },
            { code: 'GIVEUSATANK', desc: 'Aparece un Tanque Militar Rhino' },
            { code: 'NOPOLICEPLEASE', desc: 'Quita todo el nivel de búsqueda policial' },
            { code: 'MOREPOLICEPLEASE', desc: 'Aumenta 2 estrellas de búsqueda policial' },
            { code: 'CHITTYCHITTYBB', desc: 'Autos voladores con baja gravedad' },
            { code: 'CORNERSLIKEMAD', desc: 'Manejo perfecto y frenos instantáneos' },
            { code: 'BANGBANGBANG', desc: 'Detona todos los vehículos cercanos' },
            { code: 'TIMEFLIESWHENYOU', desc: 'Juego acelerado (Reloj y mundo rápido)' },
            { code: 'BOOOOORING', desc: 'Cámara lenta (Efecto Matrix)' },
            { code: 'SKINCANCERFORME', desc: 'Clima soleado y despejado en Liberty City' }
        ];

        function copyCheatCode(code) {
            navigator.clipboard.writeText(code).then(() => {
                showToast('Truco ' + code + ' copiado. Escríbelo jugando', '📋');
            }).catch(() => {
                showToast('Código: ' + code, '⚡');
            });
        }

        function checkGameCheats(gameId) {
            const panel = document.getElementById('gameCheatsPanel');
            const grid = document.getElementById('cheatsGrid');
            if (!panel || !grid) return;

            const isGta = String(gameId).toLowerCase().includes('gta') || String(gameId).toLowerCase().includes('grand-theft-auto');
            if (isGta) {
                grid.innerHTML = GTA_CHEATS.map(c => \`
                    <div onclick="copyCheatCode('\${c.code}')" class="p-2.5 rounded-lg bg-gray-950 border border-gray-800 hover:border-amber-500/50 hover:bg-gray-800/50 transition cursor-pointer group flex flex-col justify-between">
                        <div class="flex items-center justify-between mb-1">
                            <span class="font-mono font-bold text-xs text-amber-300 group-hover:text-amber-200">\${c.code}</span>
                            <span class="text-[10px] text-gray-500 group-hover:text-amber-400">📋</span>
                        </div>
                        <p class="text-[10px] text-gray-400 leading-tight">\${c.desc}</p>
                    </div>
                \`).join('');
                panel.classList.remove('hidden');
            } else {
                panel.classList.add('hidden');
            }
        }
`;

if (!html.includes('const GTA_CHEATS = [')) {
  html = html.replace('function openGame(id) {', cheatsJs + '\n        function openGame(id) {');
  console.log('Inserted GTA_CHEATS before function openGame(id)!');
}

// Hook checkGameCheats in openGame(id)
if (!html.includes('checkGameCheats(game.id);')) {
  html = html.replace('renderModalRecommendations(game);', 'renderModalRecommendations(game);\n            checkGameCheats(game.id);');
  console.log('Hooked checkGameCheats in openGame(id)!');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with cheats!');
