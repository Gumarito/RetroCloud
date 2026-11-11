const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

console.log('Original index.html length:', html.length);

// 1. Scrollbar suppression in CSS
const scrollbarOld = `.scrollbar-none::-webkit-scrollbar,
        #recentlyPlayedList::-webkit-scrollbar,
        #gameFilters::-webkit-scrollbar,
        #modalRecList::-webkit-scrollbar,
        #alphabetJumpList::-webkit-scrollbar,
        *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
        }`;

const scrollbarNew = `/* ==================== SUPRESIÓN COMPLETA DE BARRAS DE SCROLL ==================== */
        #recentlyPlayedList,
        #gameFilters,
        #modalRecList,
        #alphabetJumpList,
        .scrollbar-none {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
        }
        #recentlyPlayedList::-webkit-scrollbar,
        #gameFilters::-webkit-scrollbar,
        #modalRecList::-webkit-scrollbar,
        #alphabetJumpList::-webkit-scrollbar,
        .scrollbar-none::-webkit-scrollbar,
        div[class*="overflow-x-auto"]::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            background: transparent !important;
            -webkit-appearance: none !important;
        }`;

if (html.includes(scrollbarOld)) {
  html = html.replace(scrollbarOld, scrollbarNew);
  console.log('Updated scrollbar CSS');
} else {
  console.log('Scrollbar CSS pattern not found verbatim, appending to style block');
}

// 2. Card title line-clamp-2
const oldTitleLine = '<h3 class="text-xs sm:text-lg font-bold mt-0.5 sm:mt-1 text-white truncate">${highlightSearchMatch(game.title, query)}</h3>';
const newTitleLine = '<h3 class="text-xs sm:text-base font-bold mt-0.5 sm:mt-1 text-white line-clamp-2 leading-tight min-h-[2.5rem] flex items-center">${highlightSearchMatch(game.title, query)}</h3>';
if (html.includes(oldTitleLine)) {
  html = html.replace(oldTitleLine, newTitleLine);
  console.log('Updated card title to line-clamp-2');
}

// 3. Modal vote buttons size
const oldVoteWidget = `<div id="modalVoteWidget" class="inline-flex items-center rounded-lg border border-gray-700 bg-gray-900/90 text-xs font-semibold overflow-hidden shadow-sm shrink-0">
                    <button type="button" id="modalLikeBtn" onclick="handleGameVote(activeGameId, 'like')" title="Me gusta (Voto arriba)" class="inline-flex items-center gap-1.5 px-2.5 py-1 text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40 transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span id="modalLikeCount">0</span>
                    </button>
                    <span class="w-[1px] h-3.5 bg-gray-700"></span>
                    <button type="button" id="modalDislikeBtn" onclick="handleGameVote(activeGameId, 'dislike')" title="No me gusta (Voto abajo)" class="inline-flex items-center px-2 py-1 text-gray-400 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>`;

const newVoteWidget = `<div id="modalVoteWidget" class="inline-flex items-center rounded-xl border border-gray-700/80 bg-gray-900/95 text-xs font-semibold overflow-hidden shadow-md shrink-0">
                    <button type="button" id="modalLikeBtn" onclick="handleGameVote(activeGameId, 'like')" title="Me gusta (Voto arriba)" class="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-gray-200 hover:text-emerald-400 hover:bg-emerald-950/50 transition cursor-pointer text-sm font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span id="modalLikeCount">0</span>
                    </button>
                    <span class="w-[1px] h-5 bg-gray-700"></span>
                    <button type="button" id="modalDislikeBtn" onclick="handleGameVote(activeGameId, 'dislike')" title="No me gusta (Voto abajo)" class="inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 text-gray-400 hover:text-rose-400 hover:bg-rose-950/50 transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>`;

if (html.includes(oldVoteWidget)) {
  html = html.replace(oldVoteWidget, newVoteWidget);
  console.log('Updated vote widget buttons to larger, comfortable UI');
}

// 4. Update Category Buttons in HTML to match photo 3
const oldFilters = `<div id="gameFilters" class="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="group">
                <button type="button" data-filter="all" aria-pressed="true" class="rounded-full border border-indigo-500 bg-indigo-600 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer shrink-0">Todos</button>
                <button type="button" data-filter="Acción" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚡ Acción</button>
                <button type="button" data-filter="Plataformas" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🕹️ Plataformas</button>
                <button type="button" data-filter="Disparos" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🎯 Disparos</button>
                <button type="button" data-filter="Carreras" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🏎️ Carreras</button>
                <button type="button" data-filter="Lucha" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚔️ Lucha</button>
                <button type="button" data-filter="Terror" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">👻 Terror</button>
                <button type="button" data-filter="Aventura" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⛰️ Aventura</button>
                <button type="button" data-filter="Puzzle" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🧩 Puzzle</button>
                <button type="button" data-filter="Sandbox" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">📦 Sandbox</button>
                <button type="button" data-filter="Deportes" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚽ Deportes</button>
                <button type="button" data-filter="Retro" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">👾 Retro Clásicos</button>
                <button type="button" data-filter="mobile" aria-pressed="false" class="rounded-full border border-emerald-500/40 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 transition hover:border-emerald-500 hover:text-white cursor-pointer shrink-0">📱 Táctil</button>
                <button type="button" data-filter="favorites" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⭐ Mis Favoritos</button>
            </div>`;

const newFilters = `<div id="gameFilters" class="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="group">
                <button type="button" data-filter="all" aria-pressed="true" class="rounded-full border border-indigo-500 bg-indigo-600 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white transition cursor-pointer shrink-0">Todos</button>
                <button type="button" data-filter="Acción" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚡ Acción</button>
                <button type="button" data-filter="Aventura" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⛰️ Aventura</button>
                <button type="button" data-filter="Lucha" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚔️ Lucha</button>
                <button type="button" data-filter="Terror" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">👻 Terror</button>
                <button type="button" data-filter="Plataformas" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🕹️ Plataformas</button>
                <button type="button" data-filter="Carreras" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🏎️ Carreras</button>
                <button type="button" data-filter="Estrategia" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🧙 Estrategia</button>
                <button type="button" data-filter="Sandbox" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">📦 Sandbox</button>
                <button type="button" data-filter="Disparos" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">🎯 Disparos</button>
                <button type="button" data-filter="Deportes" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⚽ Deportes</button>
                <button type="button" data-filter="mobile" aria-pressed="false" class="rounded-full border border-emerald-500/40 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 transition hover:border-emerald-500 hover:text-white cursor-pointer shrink-0">📱 Táctil</button>
                <button type="button" data-filter="favorites" aria-pressed="false" class="rounded-full border border-gray-700 bg-gray-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 transition hover:border-indigo-500 hover:text-white cursor-pointer shrink-0">⭐ Mis Favoritos</button>
            </div>`;

if (html.includes(oldFilters)) {
  html = html.replace(oldFilters, newFilters);
  console.log('Updated category filters to clean ordered list');
}

// 5. Update filtering matching condition
const oldFilterCond = `(activeCollection === 'all' ||
                    (activeCollection === 'favorites' ? favoriteIds.has(String(game.id)) :
                    (activeCollection === 'mobile' ? (game.mobileReady || (game.tags && (game.tags.includes('mobile-ready') || game.tags.includes('Táctil')))) :
                    (game.category && game.category.toLowerCase() === activeCollection.toLowerCase()))))`;

const newFilterCond = `(activeCollection === 'all' ||
                    (activeCollection === 'favorites' ? favoriteIds.has(String(game.id)) :
                    (activeCollection === 'mobile' ? (game.mobileReady || (game.tags && (game.tags.includes('mobile-ready') || game.tags.includes('Táctil')))) :
                    ((game.category && game.category.toLowerCase() === activeCollection.toLowerCase()) ||
                     (game.tags && game.tags.some(t => t.toLowerCase().includes(activeCollection.toLowerCase())))))))`;

if (html.includes(oldFilterCond)) {
  html = html.replace(oldFilterCond, newFilterCond);
  console.log('Updated filter condition to match both category and tags');
}

// 6. Update Franchise/Saga recommendations in renderModalRecommendations
const oldRecCode = `const curId = String(currentGame.id);
            // 1. Famosos de la misma categoría
            const sameCat = games.filter(g => String(g.id) !== curId && g.category === currentGame.category);
            const famousSameCat = sameCat.filter(g => famousIds.includes(g.id) || g.featured);
            // 2. Famosos globales de cualquier categoría
            const famousGlobal = games.filter(g => String(g.id) !== curId && (famousIds.includes(g.id) || g.featured || (g.likes && g.likes >= 1200)));
            // 3. Otros de la misma categoría
            const otherSameCat = sameCat.filter(g => !famousIds.includes(g.id) && !g.featured);

            // Construir lista única priorizada
            const seen = new Set();
            const recommendations = [];
            for (const g of [...famousSameCat, ...famousGlobal, ...otherSameCat]) {
                if (!seen.has(g.id)) {
                    seen.add(g.id);
                    recommendations.push(g);
                    if (recommendations.length >= 6) break;
                }
            }`;

const newRecCode = `const curId = String(currentGame.id);
            // 0. Si el juego tiene saga (ej: tekken, mario, sonic, doom, etc.), mostrar otros juegos de la saga PRIMERO
            let sagaGames = [];
            if (currentGame.saga) {
                sagaGames = games.filter(g => String(g.id) !== curId && g.saga === currentGame.saga);
            }
            // 1. Famosos de la misma categoría
            const sameCat = games.filter(g => String(g.id) !== curId && (!currentGame.saga || g.saga !== currentGame.saga) && g.category === currentGame.category);
            const famousSameCat = sameCat.filter(g => famousIds.includes(g.id) || g.featured);
            // 2. Famosos globales de cualquier categoría
            const famousGlobal = games.filter(g => String(g.id) !== curId && (!currentGame.saga || g.saga !== currentGame.saga) && (famousIds.includes(g.id) || g.featured || (g.likes && g.likes >= 1200)));
            // 3. Otros de la misma categoría
            const otherSameCat = sameCat.filter(g => !famousIds.includes(g.id) && !g.featured);

            // Construir lista única priorizada: saga primero, luego categoría, luego globales
            const seen = new Set();
            const recommendations = [];
            for (const g of [...sagaGames, ...famousSameCat, ...famousGlobal, ...otherSameCat]) {
                if (!seen.has(g.id)) {
                    seen.add(g.id);
                    recommendations.push(g);
                    if (recommendations.length >= 8) break;
                }
            }`;

if (html.includes(oldRecCode)) {
  html = html.replace(oldRecCode, newRecCode);
  console.log('Updated recommendations to prioritize franchise sagas (Tekken, Mario, Doom, etc.)');
}

// 7. Auto-focus iframe on open and prevent arrow/space scrolling
const oldOpenIframeBlock = `showGameLoader();
                iframe.classList.remove('hidden');
                initGameVolume(game.id);
                iframe.src = game.url;`;

const newOpenIframeBlock = `showGameLoader();
                iframe.classList.remove('hidden');
                initGameVolume(game.id);
                iframe.onload = () => {
                    hideGameLoader();
                    try {
                        iframe.focus();
                        if (iframe.contentWindow) iframe.contentWindow.focus();
                    } catch(e){}
                };
                iframe.src = game.url;`;

if (html.includes(oldOpenIframeBlock)) {
  html = html.replace(oldOpenIframeBlock, newOpenIframeBlock);
  console.log('Added auto-focus on iframe load in openGame()');
}

// 8. Prevent arrow/space window scroll during game
const oldEscKeydown = `} else if (e.key === 'Escape' && isModalOpen) {
                closeGame();`;

const newEscKeydown = `} else if (isModalOpen && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar', 'PageUp', 'PageDown'].includes(e.key)) {
                // Prevenir que las teclas de juego muevan el scroll de la página de fondo
                e.preventDefault();
                const frame = document.getElementById('gameFrame');
                if (frame && frame.contentWindow) {
                    try { frame.contentWindow.focus(); } catch(err){}
                }
            } else if (e.key === 'Escape' && isModalOpen) {
                closeGame();`;

if (html.includes(oldEscKeydown)) {
  html = html.replace(oldEscKeydown, newEscKeydown);
  console.log('Added arrow keys & space scroll prevention');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully wrote updated index.html, new length:', html.length);
