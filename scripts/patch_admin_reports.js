const fs = require('fs');

let admin = fs.readFileSync('admin.html', 'utf8');

// 1. Add tab button
const oldTabsRegex = /<button type="button" id="tabBtnDb"[\s\S]*?<\/button>/m;
const newTabButtons = `<button type="button" id="tabBtnDb" onclick="switchTab('db')" class="px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer">
                    ⚡ Supabase (Postgres)
                </button>
                <button type="button" id="tabBtnReports" onclick="switchTab('reports')" class="px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-200 transition cursor-pointer flex items-center gap-1.5">
                    <span>🚨 Servidores Reportados</span>
                    <span id="reportsCountBadge" class="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded-full font-bold">0</span>
                </button>`;

if (oldTabsRegex.test(admin) && !admin.includes('tabBtnReports')) {
  admin = admin.replace(oldTabsRegex, newTabButtons);
  console.log('Added tabBtnReports to admin navigation!');
}

// 2. Add viewReports section
const oldHistorySection = '</section>\n\n        <!-- ==================== VISTA 3: BASE DE DATOS SUPABASE ==================== -->';
const reportsSectionHtml = `</section>

        <!-- ==================== VISTA 4: REPORTES DE SERVIDORES CAÍDOS ==================== -->
        <section id="viewReports" class="hidden space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-sm font-bold text-white flex items-center gap-2">
                        <span>🚨 Servidores y Juegos Reportados por Usuarios</span>
                    </h2>
                    <p class="text-xs text-gray-400">Revisa de inmediato qué juegos o servidores han fallado según los reportes de los jugadores.</p>
                </div>
                <button type="button" onclick="clearAllReports()" class="text-xs text-rose-400 hover:text-rose-300 underline">
                    Limpiar todos los reportes
                </button>
            </div>

            <div class="rounded-xl border border-gray-800 overflow-hidden bg-gray-900/60 shadow-sm">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-gray-900/90 border-b border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th class="py-3 px-4">Fecha y Hora</th>
                                <th class="py-3 px-4">Juego Afectado</th>
                                <th class="py-3 px-4">Enlace / Servidor Caído</th>
                                <th class="py-3 px-3">Estado</th>
                                <th class="py-3 px-4 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody id="reportsTableBody" class="divide-y divide-gray-800/60 font-medium text-gray-300">
                            <!-- Inyectado dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- ==================== VISTA 3: BASE DE DATOS SUPABASE ==================== -->`;

if (admin.includes(oldHistorySection) && !admin.includes('id="viewReports"')) {
  admin = admin.replace(oldHistorySection, reportsSectionHtml);
  console.log('Added viewReports section in admin.html!');
}

// 3. Update switchTab and renderReports in JavaScript
const oldSwitchTabRegex = /function switchTab\(tab\) \{[\s\S]*?document\.getElementById\('viewDb'\)\.classList\.toggle\('hidden', tab !== 'db'\);[\s\S]*?\}/m;

const newSwitchTab = `function switchTab(tab) {
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
        }

        function getStoredReports() {
            try {
                return JSON.parse(localStorage.getItem('retrocloud_reports') || '[]');
            } catch(e) {
                return [];
            }
        }

        function renderReportsTable() {
            const reports = getStoredReports();
            const badge = document.getElementById('reportsCountBadge');
            if (badge) badge.innerText = reports.filter(r => r.status === 'pending').length;

            const tbody = document.getElementById('reportsTableBody');
            if (!tbody) return;

            if (reports.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="py-8 text-center text-gray-500">🎉 No hay reportes de servidores caídos. Todos los juegos están funcionando al 100%.</td></tr>';
                return;
            }

            tbody.innerHTML = reports.map((r, i) => \`
                <tr class="hover:bg-gray-800/40 transition">
                    <td class="py-2.5 px-4 font-mono text-[11px] text-gray-400">\${new Date(r.timestamp).toLocaleString()}</td>
                    <td class="py-2.5 px-4 font-semibold text-white">\${escapeHtml(r.gameTitle)}</td>
                    <td class="py-2.5 px-4 font-mono text-[11px] text-gray-400 max-w-xs truncate" title="\${escapeHtml(r.url)}">\${escapeHtml(r.url)}</td>
                    <td class="py-2.5 px-3">
                        <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase \${r.status === 'resolved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}">
                            \${r.status === 'resolved' ? '✓ Solucionado' : '🔴 Pendiente'}
                        </span>
                    </td>
                    <td class="py-2.5 px-4 text-right">
                        \${r.status === 'pending' ? \`
                            <button onclick="resolveReport('\${r.id}')" class="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition cursor-pointer mr-1">
                                Resolver
                            </button>
                        \` : ''}
                        <button onclick="deleteReport('\${r.id}')" class="px-2 py-1 rounded bg-gray-800 hover:bg-rose-950 text-gray-400 hover:text-rose-300 text-[11px] transition cursor-pointer">
                            Eliminar
                        </button>
                    </td>
                </tr>
            \`).join('');
        }

        function resolveReport(reportId) {
            const reports = getStoredReports();
            const found = reports.find(r => r.id === reportId);
            if (found) found.status = 'resolved';
            localStorage.setItem('retrocloud_reports', JSON.stringify(reports));
            renderReportsTable();
        }

        function deleteReport(reportId) {
            let reports = getStoredReports();
            reports = reports.filter(r => r.id !== reportId);
            localStorage.setItem('retrocloud_reports', JSON.stringify(reports));
            renderReportsTable();
        }

        function clearAllReports() {
            if (confirm('¿Deseas limpiar todos los reportes de servidores?')) {
                localStorage.removeItem('retrocloud_reports');
                renderReportsTable();
            }
        }`;

if (oldSwitchTabRegex.test(admin)) {
  admin = admin.replace(oldSwitchTabRegex, newSwitchTab);
  console.log('Updated switchTab and added reports management functions in admin.html!');
}

// Hook renderReportsTable in refreshDashboard
admin = admin.replace('renderHistoryTable();', 'renderHistoryTable();\n            renderReportsTable();');

fs.writeFileSync('admin.html', admin, 'utf8');
console.log('admin.html successfully updated with complete Reports Dashboard!');
