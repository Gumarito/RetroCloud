const fs = require('fs');

const raw = fs.readFileSync('index.html', 'utf8');
const isCRLF = raw.includes('\r\n');
const lines = raw.split(/\r?\n/);

console.log('Total lines in index.html:', lines.length);

// 1. Modify lines 241 to 258: Scrollbars
const idxScrollbar = lines.findIndex(l => l.includes('/* ==================== SUPRESIÓN DE BARRAS DE SCROLL ANTIESTÉTICAS'));
if (idxScrollbar > -1) {
  const newScrollbarCss = [
    '        /* ==================== SUPRESIÓN COMPLETA DE BARRAS DE SCROLL ==================== */',
    '        #recentlyPlayedList,',
    '        #gameFilters,',
    '        #modalRecList,',
    '        #alphabetJumpList,',
    '        .scrollbar-none {',
    '            scrollbar-width: none !important;',
    '            -ms-overflow-style: none !important;',
    '        }',
    '        #recentlyPlayedList::-webkit-scrollbar,',
    '        #gameFilters::-webkit-scrollbar,',
    '        #modalRecList::-webkit-scrollbar,',
    '        #alphabetJumpList::-webkit-scrollbar,',
    '        .scrollbar-none::-webkit-scrollbar,',
    '        div[class*="overflow-x-auto"]::-webkit-scrollbar,',
    '        *::-webkit-scrollbar {',
    '            display: none !important;',
    '            width: 0 !important;',
    '            height: 0 !important;',
    '            background: transparent !important;',
    '            -webkit-appearance: none !important;',
    '        }'
  ];
  // Find end of scrollbar block
  let endIdx = idxScrollbar;
  while (endIdx < lines.length && !lines[endIdx].includes('MODO CLARO RETRO')) {
    endIdx++;
  }
  lines.splice(idxScrollbar, endIdx - idxScrollbar, ...newScrollbarCss, '');
  console.log('Patch 1: Replaced scrollbar CSS block');
}

// 2. Modify filters at lines ~444
const idxFilters = lines.findIndex(l => l.includes('id="gameFilters"'));
if (idxFilters > -1) {
  let endFilters = idxFilters;
  while (endFilters < lines.length && !lines[endFilters].includes('</div')) {
    endFilters++;
  }
  const newFilterButtons = [
    '            <div id="gameFilters" class="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="group">',
    '                <button type="button" data-filter="all" aria-pressed="true" class="rounded-full border border-indigo-500 bg-indigo-600 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer shrink-0">Todos</button>',
    '                <button type="button" data-filter="Acción" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚡ Acción</button>',
    '                <button type="button" data-filter="Aventura" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⛰️ Aventura</button>',
    '                <button type="button" data-filter="Lucha" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚔️ Lucha</button>',
    '                <button type="button" data-filter="Terror" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">👻 Terror</button>',
    '                <button type="button" data-filter="Plataformas" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🕹️ Plataformas</button>',
    '                <button type="button" data-filter="Carreras" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🏎️ Carreras</button>',
    '                <button type="button" data-filter="Estrategia" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🧙 Estrategia</button>',
    '                <button type="button" data-filter="Sandbox" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">📦 Sandbox</button>',
    '                <button type="button" data-filter="Disparos" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🎯 Disparos</button>',
    '                <button type="button" data-filter="Deportes" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚽ Deportes</button>',
    '                <button type="button" data-filter="mobile" aria-pressed="false" class="rounded-full border border-emerald-500/40 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 transition hover:border-emerald-500 hover:text-white cursor-pointer shrink-0">📱 Táctil</button>',
    '                <button type="button" data-filter="favorites" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⭐ Mis Favoritos</button>'
  ];
  lines.splice(idxFilters, endFilters - idxFilters, ...newFilterButtons);
  console.log('Patch 2: Replaced #gameFilters list');
}

// 3. Modify modalVoteWidget around line 576
const idxVote = lines.findIndex(l => l.includes('id="modalVoteWidget"'));
if (idxVote > -1) {
  let endVote = idxVote;
  while (endVote < lines.length && !lines[endVote].includes('</div>')) {
    endVote++;
  }
  const newVoteWidget = [
    '                <div id="modalVoteWidget" class="inline-flex items-center rounded-xl border border-gray-700/80 bg-gray-900/95 text-xs font-semibold overflow-hidden shadow-md shrink-0">',
    '                    <button type="button" id="modalLikeBtn" onclick="handleGameVote(activeGameId, \'like\')" title="Me gusta (Voto arriba)" class="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-gray-200 hover:text-emerald-400 hover:bg-emerald-950/50 transition cursor-pointer text-sm font-bold">',
    '                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">',
    '                            <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />',
    '                        </svg>',
    '                        <span id="modalLikeCount">0</span>',
    '                    </button>',
    '                    <span class="w-[1px] h-5 bg-gray-700"></span>',
    '                    <button type="button" id="modalDislikeBtn" onclick="handleGameVote(activeGameId, \'dislike\')" title="No me gusta (Voto abajo)" class="inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 text-gray-400 hover:text-rose-400 hover:bg-rose-950/50 transition cursor-pointer">',
    '                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">',
    '                            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />',
    '                        </svg>',
    '                    </button>',
    '                </div>'
  ];
  lines.splice(idxVote, endVote - idxVote + 1, ...newVoteWidget);
  console.log('Patch 3: Replaced modalVoteWidget with larger comfortable buttons');
}

// 4. Update initTheme to set theme-light on document.body as well
const idxInitTheme = lines.findIndex(l => l.includes('function initTheme()'));
if (idxInitTheme > -1) {
  let endTheme = idxInitTheme;
  while (endTheme < lines.length && !lines[endTheme].includes('updateThemeUI')) {
    endTheme++;
  }
  const newInitTheme = [
    '        function initTheme() {',
    '            let isLight = false;',
    '            try {',
    '                const saved = localStorage.getItem(\'retrocloud_theme\');',
    '                if (saved) {',
    '                    isLight = saved === \'light\';',
    '                } else if (window.matchMedia) {',
    '                    isLight = window.matchMedia(\'(prefers-color-scheme: light)\').matches;',
    '                }',
    '            } catch(e) {}',
    '            document.documentElement.classList.toggle(\'theme-light\', isLight);',
    '            if (document.body) document.body.classList.toggle(\'theme-light\', isLight);',
    '            updateThemeUI(isLight);',
    '        }'
  ];
  // Find closing bracket
  while (endTheme < lines.length && !lines[endTheme].includes('}')) endTheme++;
  lines.splice(idxInitTheme, endTheme - idxInitTheme + 1, ...newInitTheme);
  console.log('Patch 4: Updated initTheme()');
}

// 5. Update renderModalRecommendations to prioritize franchise saga
const idxRecFunc = lines.findIndex(l => l.includes('function renderModalRecommendations(currentGame)'));
if (idxRecFunc > -1) {
  // Find where const curId = is defined
  const idxCurId = lines.findIndex((l, i) => i > idxRecFunc && l.includes('const curId ='));
  if (idxCurId > -1) {
    let endRecLogic = idxCurId;
    while (endRecLogic < lines.length && !lines[endRecLogic].includes('list.innerHTML =')) {
      endRecLogic++;
    }
    const newRecLogic = [
      '            const curId = String(currentGame.id);',
      '            // 0. Si el juego pertenece a una saga (ej: Tekken, Mario, Sonic, Doom), mostrar los juegos de esa saga PRIMERO',
      '            let sagaGames = [];',
      '            if (currentGame.saga) {',
      '                sagaGames = games.filter(g => String(g.id) !== curId && g.saga === currentGame.saga);',
      '            }',
      '            // 1. Famosos de la misma categoría',
      '            const sameCat = games.filter(g => String(g.id) !== curId && (!currentGame.saga || g.saga !== currentGame.saga) && g.category === currentGame.category);',
      '            const famousSameCat = sameCat.filter(g => famousIds.includes(g.id) || g.featured);',
      '            // 2. Famosos globales de cualquier categoría',
      '            const famousGlobal = games.filter(g => String(g.id) !== curId && (!currentGame.saga || g.saga !== currentGame.saga) && (famousIds.includes(g.id) || g.featured || (g.likes && g.likes >= 1200)));',
      '            // 3. Otros de la misma categoría',
      '            const otherSameCat = sameCat.filter(g => !famousIds.includes(g.id) && !g.featured);',
      '',
      '            // Construir lista única priorizada: saga primero, luego categoría, luego globales',
      '            const seen = new Set();',
      '            const recommendations = [];',
      '            for (const g of [...sagaGames, ...famousSameCat, ...famousGlobal, ...otherSameCat]) {',
      '                if (!seen.has(g.id)) {',
      '                    seen.add(g.id);',
      '                    recommendations.push(g);',
      '                    if (recommendations.length >= 8) break;',
      '                }',
      '            }'
    ];
    lines.splice(idxCurId, endRecLogic - idxCurId, ...newRecLogic);
    console.log('Patch 5: Updated renderModalRecommendations() for franchise sagas');
  }
}

// 6. Update openGame iframe onload focus
const idxOpenGame = lines.findIndex(l => l.includes('iframe.src = game.url;'));
if (idxOpenGame > -1) {
  const newIframeLoad = [
    '                iframe.onload = () => {',
    '                    hideGameLoader();',
    '                    try {',
    '                        iframe.focus();',
    '                        if (iframe.contentWindow) iframe.contentWindow.focus();',
    '                    } catch(e) {}',
    '                };',
    '                iframe.src = game.url;'
  ];
  lines.splice(idxOpenGame, 1, ...newIframeLoad);
  console.log('Patch 6: Added iframe focus on onload in openGame()');
}

// 7. Prevent arrow keys / space page scroll during game modal
const idxKeydown = lines.findIndex(l => l.includes('window.addEventListener(\'keydown\', e => {'));
if (idxKeydown > -1) {
  const insertIdx = idxKeydown + 5; // after const isModalOpen
  const scrollGuard = [
    '            if (isModalOpen && ![\'INPUT\', \'TEXTAREA\', \'SELECT\'].includes(e.target.tagName)) {',
    '                if ([\'ArrowUp\', \'ArrowDown\', \'ArrowLeft\', \'ArrowRight\', \' \', \'Spacebar\', \'PageUp\', \'PageDown\'].includes(e.key)) {',
    '                    e.preventDefault();',
    '                    const frame = document.getElementById(\'gameFrame\');',
    '                    if (frame && frame.contentWindow) {',
    '                        try { frame.contentWindow.focus(); } catch(err){}',
    '                    }',
    '                }',
    '            }'
  ];
  lines.splice(insertIdx, 0, ...scrollGuard);
  console.log('Patch 7: Added scroll guard for arrow keys & space');
}

// 8. Update filter matching condition
const idxFilterCond = lines.findIndex(l => l.includes('game.category && game.category.toLowerCase() === activeCollection.toLowerCase()'));
if (idxFilterCond > -1) {
  lines[idxFilterCond] = '                    ((game.category && game.category.toLowerCase() === activeCollection.toLowerCase()) || (game.tags && game.tags.some(t => t.toLowerCase().includes(activeCollection.toLowerCase()))))))) &&';
  console.log('Patch 8: Updated filter matching condition to include tags');
}

const newlineChar = isCRLF ? '\r\n' : '\n';
fs.writeFileSync('index.html', lines.join(newlineChar), 'utf8');
console.log('All patches applied cleanly to index.html!');
