const fs = require('fs');

const raw = fs.readFileSync('index.html', 'utf8');
const isCRLF = raw.includes('\r\n');
const lines = raw.split(/\r?\n/);

console.log('Total lines in index.html:', lines.length);

// 1. Redesign externalLauncher HTML
const idxLauncher = lines.findIndex(l => l.includes('id="externalLauncher"'));
console.log('idxLauncher:', idxLauncher);
if (idxLauncher > -1) {
  let endLauncher = idxLauncher;
  while (endLauncher < lines.length && !lines[endLauncher].includes('id="modalRecommendedGames"')) {
    endLauncher++;
  }
  // Step back before modalRecommendedGames and find the closing </div> of externalLauncher
  while (endLauncher > idxLauncher && lines[endLauncher].trim() !== '</div>') {
    endLauncher--;
  }

  const newLauncherHtml = [
    '            <div id="externalLauncher" class="hidden flex-col items-center justify-center text-center p-6 sm:p-10 max-w-xl w-full mx-auto">',
    '                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center mb-4 text-white shadow-2xl shadow-indigo-500/30 transform hover:scale-105 transition">',
    '                    <span class="text-3xl sm:text-4xl" aria-hidden="true">🚀</span>',
    '                </div>',
    '                <h3 id="launcherHeadline" class="text-2xl sm:text-3xl font-black mb-2 text-white tracking-tight">Listo para Jugar</h3>',
    '                <p id="launcherNotice" class="text-gray-300 text-sm sm:text-base mb-6 max-w-md mx-auto leading-relaxed">',
    '                    Este título se ejecuta en su reproductor oficial dedicado con máxima fluidez, sonido completo y aceleración gráfica directa.',
    '                </p>',
    '',
    '                <a id="launchExternalBtn" href="#" target="_blank" rel="noopener noreferrer" class="w-full max-w-md inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-2xl transition transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-500/25 mb-4 cursor-pointer">',
    '                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">',
    '                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />',
    '                    </svg>',
    '                    <span id="launchBtnText">Iniciar Juego Ahora</span>',
    '                </a>',
    '',
    '                <div id="mirrorsWrapper" class="w-full max-w-md mt-2 text-left">',
    '                    <label id="mirrorsLabel" class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Servidor de conexión:</label>',
    '                    <div id="mirrorsList" class="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1"></div>',
    '                </div>',
    '            </div>'
  ];

  lines.splice(idxLauncher, endLauncher - idxLauncher + 1, ...newLauncherHtml);
  console.log('Replaced externalLauncher HTML with modern friendly visual');
}

// 2. Remove yellow technical note box from game card rendering
const idxCardNote = lines.findIndex(l => l.includes('${game.note ? `<p class="mt-1.5 text-[10px]'));
if (idxCardNote > -1) {
  lines.splice(idxCardNote, 1);
  console.log('Removed technical note warning box from game cards');
}

// 3. Update translations for launcher
const idxTransEs = lines.findIndex(l => l.includes('launcherTitle: "Lanzador de Alta Velocidad"'));
if (idxTransEs > -1) {
  lines[idxTransEs] = '                launcherTitle: "Listo para Jugar",';
  lines[idxTransEs + 1] = '                launcherNotice: "Este título se ejecuta en su reproductor oficial dedicado con máxima fluidez, sonido completo y aceleración gráfica directa.",';
  lines[idxTransEs + 2] = '                mirrorsTitle: "Servidor de conexión:",';
  lines[idxTransEs + 3] = '                launchBtn: "Iniciar Juego Ahora",';
  console.log('Updated Spanish launcher translations');
}

const newlineChar = isCRLF ? '\r\n' : '\n';
fs.writeFileSync('index.html', lines.join(newlineChar), 'utf8');
console.log('Successfully updated index.html!');
