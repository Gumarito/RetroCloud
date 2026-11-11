const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// The block to remove
const block = `
        <!-- ==================== VISTA 5: JUEGOS EN CUARENTENA / PENDIENTES ==================== -->
        <section id="viewQuarantine" class="hidden space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-sm font-bold text-white flex items-center gap-2">
                        <span>🛡️ Juegos en Cuarentena / Pendientes de Reparación</span>
                        <span id="quarantineCountBadgeHeader" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">0</span>
                    </h2>
                    <p class="text-xs text-gray-400">Juegos retirados del catálogo público por contener portales ajenos con anuncios (gn-math.dev), archivos caídos o requerir descargas pesadas.</p>
                </div>
            </div>

            <div class="rounded-xl border border-gray-800 overflow-hidden bg-gray-900/60 shadow-sm">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-gray-900/90 border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th class="py-3 px-4">Juego</th>
                                <th class="py-3 px-4">Categoría</th>
                                <th class="py-3 px-4">Motivo de Cuarentena</th>
                                <th class="py-3 px-4">URL / Servidor Afectado</th>
                            </tr>
                        </thead>
                        <tbody id="quarantineTableBody" class="divide-y divide-gray-800/60 font-medium text-gray-300">
                            <!-- Inyectado dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>`;

while (html.includes(block)) {
  html = html.replace(block, '');
}

// Now insert exactly once right before <!-- ==================== VISTA 3: BASE DE DATOS SUPABASE
const marker = '<!-- ==================== VISTA 3: BASE DE DATOS SUPABASE';
if (html.includes(marker)) {
  html = html.replace(marker, block.trim() + '\n\n        ' + marker);
}

// Now let's update switchTab and add renderQuarantineTable
const oldSwitchTab = `        function switchTab(tab) {
            document.getElementById('viewGames').classList.toggle('hidden', tab !== 'games');
            document.getElementById('viewHistory').classList.toggle('hidden', tab !== 'history');
            document.getElementById('viewDb').classList.toggle('hidden', tab !== 'db');
            const vReports = document.getElementById('viewReports');
            if (vReports) vReports.classList.toggle('hidden', tab !== 'reports');

            const btnG = document.getElementById('tabBtnGames');
            const btnH = document.getElementById('tabBtnHistory');
            const btnD = document.getElementById('tabBtnDb');
            const btnR = document.getElementById('tabBtnReports');

            btnG.className = tab === 'games' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-indigo-500 text-indigo-400 transition cursor-pointer' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer';
            btnH.className = tab === 'history' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-indigo-500 text-indigo-400 transition cursor-pointer' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer';
            btnD.className = tab === 'db' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-indigo-500 text-indigo-400 transition cursor-pointer' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer';
            if (btnR) {
                btnR.className = tab === 'reports' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-rose-500 text-rose-400 transition cursor-pointer flex items-center gap-1.5' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer flex items-center gap-1.5';
            }
            if (tab === 'reports') renderReportsTable();
        }`;

const newSwitchTab = `        function switchTab(tab) {
            document.getElementById('viewGames').classList.toggle('hidden', tab !== 'games');
            document.getElementById('viewHistory').classList.toggle('hidden', tab !== 'history');
            document.getElementById('viewDb').classList.toggle('hidden', tab !== 'db');
            const vReports = document.getElementById('viewReports');
            if (vReports) vReports.classList.toggle('hidden', tab !== 'reports');
            const vQuarantine = document.getElementById('viewQuarantine');
            if (vQuarantine) vQuarantine.classList.toggle('hidden', tab !== 'quarantine');

            const btnG = document.getElementById('tabBtnGames');
            const btnH = document.getElementById('tabBtnHistory');
            const btnD = document.getElementById('tabBtnDb');
            const btnR = document.getElementById('tabBtnReports');
            const btnQ = document.getElementById('tabBtnQuarantine');

            btnG.className = tab === 'games' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-indigo-500 text-indigo-400 transition cursor-pointer' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer';
            btnH.className = tab === 'history' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-indigo-500 text-indigo-400 transition cursor-pointer' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer';
            btnD.className = tab === 'db' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-indigo-500 text-indigo-400 transition cursor-pointer' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer';
            if (btnR) {
                btnR.className = tab === 'reports' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-rose-500 text-rose-400 transition cursor-pointer flex items-center gap-1.5' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer flex items-center gap-1.5';
            }
            if (btnQ) {
                btnQ.className = tab === 'quarantine' ? 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-amber-500 text-amber-400 transition cursor-pointer flex items-center gap-1.5' : 'px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer flex items-center gap-1.5';
            }
            if (tab === 'reports') renderReportsTable();
            if (tab === 'quarantine') renderQuarantineTable();
        }

        async function renderQuarantineTable() {
            try {
                const res = await fetch('games_pending_repair.json');
                const list = await res.json();
                const badge = document.getElementById('quarantineCountBadge');
                const badgeH = document.getElementById('quarantineCountBadgeHeader');
                if (badge) badge.innerText = list.length;
                if (badgeH) badgeH.innerText = list.length;

                const tbody = document.getElementById('quarantineTableBody');
                if (!tbody) return;
                tbody.innerHTML = list.map(q => \`
                    <tr class="hover:bg-gray-800/40 transition">
                        <td class="py-2.5 px-4 font-semibold text-white">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                                <span>\${escapeHtml(q.title || q.id)}</span>
                            </div>
                        </td>
                        <td class="py-2.5 px-4 text-gray-400 text-[11px]">\${escapeHtml(q.category || 'Varios')}</td>
                        <td class="py-2.5 px-4 text-amber-300 font-medium text-[11px] max-w-sm">\${escapeHtml(q.quarantineReason || 'En revisión técnica')}</td>
                        <td class="py-2.5 px-4 font-mono text-[10px] text-gray-500 max-w-xs truncate" title="\${escapeHtml(q.url || q.file || '')}">\${escapeHtml(q.url || q.file || 'N/A')}</td>
                    </tr>
                \`).join('');
            } catch(e) {
                console.error('[RetroCloud Admin] Error al cargar juegos en cuarentena:', e);
            }
        }`;

if (html.includes('function switchTab(tab)')) {
  // Replace from function switchTab to closing bracket of switchTab
  const startIndex = html.indexOf('function switchTab(tab)');
  const endIndex = html.indexOf('function getStoredReports()');
  if (startIndex >= 0 && endIndex > startIndex) {
    html = html.slice(0, startIndex) + newSwitchTab.trim() + '\n\n        ' + html.slice(endIndex);
  }
}

// In initAdminDashboard call renderQuarantineCount
if (html.includes('renderReportsTable();') && !html.includes('renderQuarantineTable();')) {
  html = html.replace('renderReportsTable();', 'renderReportsTable(); renderQuarantineTable();');
}

fs.writeFileSync('admin.html', html, 'utf8');
console.log('Fixed admin.html successfully!');
