const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update reportBrokenMirror to persist reports
const oldReportRegex = /function reportBrokenMirror\(url, btnElement\) \{[\s\S]*?btnElement\.disabled = true;\s*\}/m;

const newReportFunc = `function reportBrokenMirror(url, btnElement) {
            const t = translations[currentLang];
            console.info('[RetroCloud] Servidor reportado:', url);
            const game = games.find(g => String(g.id) === String(activeGameId));
            const reportData = {
                id: 'rep_' + Date.now(),
                gameId: activeGameId ? String(activeGameId) : 'unknown',
                gameTitle: game ? game.title : (activeGameId || 'Juego desconocido'),
                url: url,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            try {
                const reports = JSON.parse(localStorage.getItem('retrocloud_reports') || '[]');
                reports.unshift(reportData);
                localStorage.setItem('retrocloud_reports', JSON.stringify(reports.slice(0, 200)));
            } catch(e) {}

            syncAnalyticsToCloud('report', reportData);

            const row = btnElement.closest('.bg-gray-900\\\\/90') || btnElement.parentElement.parentElement;
            if (row) {
                const pill = row.querySelector('.server-status-pill');
                if (pill) {
                    pill.className = 'server-status-pill inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0';
                    pill.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> En Mantenimiento';
                }
            }
            btnElement.classList.remove('text-gray-400', 'hover:text-red-400');
            btnElement.classList.add('text-amber-400', 'border-amber-800', 'bg-amber-950/40');
            btnElement.innerHTML = \`
                <span>✓</span>
                <span class="hidden sm:inline">\${t.reportSent}</span>
            \`;
            btnElement.disabled = true;
            showToast('Reporte enviado a los administradores', '🚨');
        }`;

if (oldReportRegex.test(html)) {
  html = html.replace(oldReportRegex, newReportFunc);
  console.log('Updated reportBrokenMirror with local & cloud persistence!');
} else {
  console.log('Warning: oldReportRegex did not match');
}

// 2. Add Quick Cheats & Extended Controls Panel Container below Player in Modal
const oldModalRec = '<!-- Carrusel de Siguiente Juego Recomendado';
const cheatsContainerHtml = `<!-- Panel de Quick Cheats y Controles Avanzados (Estilo WASM Arcade) -->
        <div id="gameCheatsPanel" class="hidden w-full max-w-6xl mt-3 p-4 rounded-xl bg-gray-900/95 border border-amber-500/30 shadow-xl">
            <div class="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
                <div class="flex items-center gap-2">
                    <span class="text-xl">⚡</span>
                    <div>
                        <h4 class="text-sm font-bold text-amber-300 flex items-center gap-2">
                            <span>Trucos Rápidos (Quick Cheats)</span>
                            <span class="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-mono font-bold">12 códigos</span>
                        </h4>
                        <p class="text-[11px] text-gray-400">Escribe estas letras directamente en tu teclado en cualquier momento mientras juegas.</p>
                    </div>
                </div>
                <span class="text-[10px] text-gray-500 hidden sm:inline">Haz clic en cualquier código para copiarlo</span>
            </div>
            
            <!-- Grid de Códigos de Trucos -->
            <div id="cheatsGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                <!-- Inyectado dinámicamente -->
            </div>

            <!-- Tabla de Controles Avanzados (A pie vs En vehículo) -->
            <div id="advancedControlsWrapper" class="pt-2 border-t border-gray-800">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-white flex items-center gap-1.5"><span>🎮</span> <span>Tabla Oficial de Controles:</span></span>
                    <span class="text-[10px] text-gray-400">Presiona <kbd class="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-[10px] text-indigo-300 font-mono">Esc</kbd> para liberar el cursor</span>
                </div>
                <div class="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60">
                    <table class="w-full text-left text-[11px]">
                        <thead class="bg-gray-900 border-b border-gray-800 text-gray-400 uppercase text-[9px] tracking-wider font-semibold">
                            <tr>
                                <th class="py-2 px-3">Acción</th>
                                <th class="py-2 px-3 text-indigo-300">A Pie</th>
                                <th class="py-2 px-3 text-amber-300">En Vehículo</th>
                                <th class="py-2 px-3 text-emerald-300">Gamepad / Mando</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-800/60 text-gray-300 font-medium">
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Movimiento / Manejo</td>
                                <td class="py-1.5 px-3">W, A, S, D o Flechas</td>
                                <td class="py-1.5 px-3">W (Acelerar) / S (Freno) / A, D (Giro)</td>
                                <td class="py-1.5 px-3">Stick Analógico Izquierdo</td>
                            </tr>
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Atacar / Disparar</td>
                                <td class="py-1.5 px-3">Clic Izquierdo o Ctrl Izq</td>
                                <td class="py-1.5 px-3">Clic Izquierdo (Disparo lateral)</td>
                                <td class="py-1.5 px-3">Gatillo Derecho (RT) / Botón B</td>
                            </tr>
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Apuntar / Vista 1ª Persona</td>
                                <td class="py-1.5 px-3">Clic Derecho (Sniper / M16)</td>
                                <td class="py-1.5 px-3 text-gray-500">N/A</td>
                                <td class="py-1.5 px-3">Gatillo Izquierdo (LT)</td>
                            </tr>
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Correr / Freno de Mano</td>
                                <td class="py-1.5 px-3">Shift Izquierdo o Espacio</td>
                                <td class="py-1.5 px-3">Espacio o Ctrl Der (Derrape)</td>
                                <td class="py-1.5 px-3">Botón A (Sprint) / R1 (Freno)</td>
                            </tr>
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Entrar / Salir de Vehículo</td>
                                <td class="py-1.5 px-3">Tecla F o Enter</td>
                                <td class="py-1.5 px-3">Tecla F o Enter</td>
                                <td class="py-1.5 px-3">Botón Y / Triángulo</td>
                            </tr>
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Bocina / Sirenas</td>
                                <td class="py-1.5 px-3 text-gray-500">N/A</td>
                                <td class="py-1.5 px-3">Tecla H (Bocina / Sirena)</td>
                                <td class="py-1.5 px-3">Presionar Stick Izquierdo (L3)</td>
                            </tr>
                            <tr>
                                <td class="py-1.5 px-3 font-semibold text-white">Cambiar Estación de Radio</td>
                                <td class="py-1.5 px-3 text-gray-500">N/A</td>
                                <td class="py-1.5 px-3">Tecla R o Insert / Delete</td>
                                <td class="py-1.5 px-3">Botón LB / L1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>\n\n        ` + oldModalRec;

if (html.includes(oldModalRec) && !html.includes('id="gameCheatsPanel"')) {
  html = html.replace(oldModalRec, cheatsContainerHtml);
  console.log('Added Quick Cheats & Advanced Controls Panel to modal in index.html!');
}

// 3. Add GTA Cheats Database & Logic in JavaScript
const cheatsJs = `
        // Base de Datos de Trucos (Cheats) para GTA y juegos compatibles
        const GTA_CHEATS = [
            { code: 'GESUNDHEIT', desc: '100% de Salud (Cura completa inmediata)' },
            { code: 'TORTOISE', desc: '100% de Armadura corporal completa' },
            { code: 'GUNSGUNSGUNS', desc: 'Todas las armas con munición infinita' },
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
                showToast(\`Truco \${code} copiado. Escríbelo jugando\`, '📋');
            }).catch(() => {
                showToast(\`Código: \${code}\`, '⚡');
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
  html = html.replace('function openGame(gameId) {', cheatsJs + '\n        function openGame(gameId) {');
  console.log('Added GTA_CHEATS database and copyCheatCode function!');
}

// Hook checkGameCheats in openGame
if (html.includes('renderModalRecommendations(game);') && !html.includes('checkGameCheats(game.id);')) {
  html = html.replace('renderModalRecommendations(game);', 'renderModalRecommendations(game);\n            checkGameCheats(game.id);');
  console.log('Hooked checkGameCheats in openGame!');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated with Quick Cheats & Reports system!');
