const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace #externalLauncher markup
const oldLauncherRegex = /<!-- External Launcher Panel [\s\S]*?<\/div>\s*<\/div>\s*<!-- Carrusel de Siguiente Juego/m;

const newLauncherHtml = `<!-- External Launcher Panel (Modo Respaldo/Externo) -->
            <div id="externalLauncher" class="hidden flex-col items-center justify-center text-center p-3 sm:p-5 max-w-md w-full mx-auto my-auto">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center mb-2.5 text-2xl text-white shadow-lg shadow-indigo-500/25">
                    <span aria-hidden="true">🚀</span>
                </div>
                <h3 id="launcherHeadline" class="text-xl sm:text-2xl font-black mb-1 text-white tracking-tight">Listo para Jugar</h3>
                <p id="launcherNotice" class="text-gray-400 text-xs sm:text-sm mb-3.5 max-w-sm mx-auto leading-normal">
                    Servidores verificados de alta velocidad y sonido original.
                </p>

                <a id="launchExternalBtn" href="#" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base px-6 py-2.5 rounded-xl transition transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-500/20 mb-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                    <span id="launchBtnText">Iniciar Juego Ahora</span>
                </a>

                <div id="mirrorsWrapper" class="w-full text-left">
                    <div class="flex items-center justify-between mb-1.5 px-0.5">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Servidores Disponibles:</span>
                        <span class="text-[10px] text-emerald-400 font-medium">100% Sin Esperas</span>
                    </div>
                    <div id="mirrorsList" class="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-0.5"></div>
                </div>
            </div>
        </div>

        <!-- Carrusel de Siguiente Juego`;

if (oldLauncherRegex.test(html)) {
  html = html.replace(oldLauncherRegex, newLauncherHtml);
  console.log('Replaced #externalLauncher markup successfully!');
} else {
  console.log('Warning: oldLauncherRegex did not match');
}

// 2. Replace bottom bar of cards in renderGames
const oldCardBottom = `<span class="truncate max-w-[70px] sm:max-w-none">\${game.mirrors ? game.mirrors.length : 1} \${t.mirrorsCountSuffix}</span>`;
const newCardBottom = `<span class="inline-flex items-center gap-1.5 font-semibold \${game.status === 'maintenance' ? 'text-amber-400' : 'text-emerald-400'}">
                        <span class="w-1.5 h-1.5 rounded-full \${game.status === 'maintenance' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}"></span>
                        \${game.status === 'maintenance' ? 'En Mantenimiento' : 'Online'}
                    </span>`;

if (html.includes(oldCardBottom)) {
  html = html.replace(oldCardBottom, newCardBottom);
  console.log('Replaced card bottom bar with Online / Mantenimiento indicator!');
} else {
  console.log('Warning: oldCardBottom not found');
}

// 3. Update mirrorsList rendering in openGame
const oldMirrorsLogicRegex = /if \(game\.mirrors && game\.mirrors\.length > 0\) \{[\s\S]*?mirrorsList\.innerHTML = game\.mirrors\.map[\s\S]*?<\/div>[\s\S]*?`\)\.join\(''\);[\s\S]*?\} else \{[\s\S]*?mirrorsList\.innerHTML = `<span class="text-xs text-gray-500">Mirror predeterminado activo\.<\/span>`;[\s\S]*?\}/m;

const newMirrorsLogic = `if (game.mirrors && game.mirrors.length > 0) {
                    mirrorsList.innerHTML = game.mirrors.map((m, index) => {
                        const isSelected = index === 0;
                        const isMaintenance = m.status === 'maintenance';
                        const serverName = 'Servidor ' + (index + 1) + ' (' + (index === 0 ? 'Principal' : 'Alternativo') + ')';
                        return \`
                        <div class="flex items-center justify-between bg-gray-900/90 border border-gray-800 rounded-lg px-3 py-2 hover:border-gray-700 transition">
                            <div class="flex items-center gap-2 min-w-0 mr-2">
                                <span class="server-status-pill inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold \${isMaintenance ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'} shrink-0">
                                    <span class="w-1.5 h-1.5 rounded-full \${isMaintenance ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}"></span>
                                    \${isMaintenance ? 'En Mantenimiento' : 'Online'}
                                </span>
                                <span class="font-medium text-xs text-gray-200 truncate">\${serverName}</span>
                            </div>
                            <div class="flex items-center gap-1.5 shrink-0">
                                <button type="button" onclick="reportBrokenMirror('\${m.url}', this)" title="\${t.reportBroken}" class="report-btn text-[10px] px-2 py-1 rounded bg-gray-800/80 hover:bg-red-950/60 text-gray-400 hover:text-red-400 border border-gray-700 transition cursor-pointer flex items-center gap-1">
                                    <span>⚠️</span>
                                    <span class="hidden sm:inline">\${t.reportBroken}</span>
                                </button>
                                <button type="button" onclick="selectMirror('\${m.url}', this)" class="mirror-btn text-xs px-2.5 py-1 rounded bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white transition cursor-pointer \${isSelected ? '!bg-indigo-600 !text-white font-bold' : ''}">
                                    \${isSelected ? t.selected : t.choose}
                                </button>
                            </div>
                        </div>\`;
                    }).join('');
                } else {
                    mirrorsList.innerHTML = \`
                        <div class="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300">
                            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                            </span>
                            <span>Servidor 1 (Principal)</span>
                        </div>
                    \`;
                }`;

if (oldMirrorsLogicRegex.test(html)) {
  html = html.replace(oldMirrorsLogicRegex, newMirrorsLogic);
  console.log('Replaced mirrorsList logic in openGame successfully!');
} else {
  console.log('Warning: oldMirrorsLogicRegex did not match');
}

// 4. Update reportBrokenMirror function
const oldReportFuncRegex = /function reportBrokenMirror\(url, btnElement\) \{[\s\S]*?btnElement\.disabled = true;\s*\}/m;
const newReportFunc = `function reportBrokenMirror(url, btnElement) {
            const t = translations[currentLang];
            console.info(\`[RetroCloud] Servidor reportado: \${url}\`);
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
        }`;

if (oldReportFuncRegex.test(html)) {
  html = html.replace(oldReportFuncRegex, newReportFunc);
  console.log('Replaced reportBrokenMirror successfully!');
} else {
  console.log('Warning: oldReportFuncRegex did not match');
}

// 5. Hide controls bar in external mode
if (html.includes("if (game.launchMode === \"external\") {")) {
  html = html.replace(
    'if (game.launchMode === "external") {',
    'if (game.launchMode === "external") {\n                document.getElementById(\'modalControlsBar\').classList.add(\'hidden\');'
  );
  html = html.replace(
    '} else {\n                launcher.classList.add(\'hidden\');',
    '} else {\n                document.getElementById(\'modalControlsBar\').classList.remove(\'hidden\');\n                launcher.classList.add(\'hidden\');'
  );
  console.log('Added modalControlsBar show/hide handling for external mode!');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated!');
