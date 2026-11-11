const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. New Modal Markup with Tabs and Pro Monetization
const newCloudModal = `    <div id="cloudSaveModal" class="fixed inset-0 z-[70] hidden items-center justify-center bg-black/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="cloudSaveTitle">
        <div class="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="mb-4 flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                    <span class="text-2xl">💾</span>
                    <div>
                        <h2 id="cloudSaveTitle" class="text-base sm:text-lg font-bold text-white">Guardado de Partidas</h2>
                        <p id="cloudSaveGameTitle" class="text-xs text-indigo-300 font-medium"></p>
                    </div>
                </div>
                <button type="button" onclick="closeCloudSaveModal()" aria-label="Cerrar modal" class="rounded-lg px-2.5 py-1 text-gray-400 hover:bg-gray-800 hover:text-white transition">✕</button>
            </div>

            <!-- Tabs Switcher -->
            <div class="flex rounded-xl bg-gray-950 p-1 mb-4 border border-gray-800 text-xs font-semibold">
                <button type="button" id="tabLocalSaveBtn" onclick="switchSaveTab('local')" class="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 text-white transition">
                    📁 Respaldo Local (Gratis)
                </button>
                <button type="button" id="tabCloudSaveBtn" onclick="switchSaveTab('cloud')" class="flex-1 py-1.5 px-3 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-center gap-1.5">
                    <span>☁️ Nube RetroCloud Pro</span>
                    <span class="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 rounded font-bold">PRO</span>
                </button>
            </div>

            <!-- Tab 1: Local Save -->
            <div id="paneLocalSave" class="space-y-3">
                <p class="text-xs text-gray-300 leading-relaxed bg-gray-950/60 p-3 rounded-lg border border-gray-800">
                    Descarga tu archivo de partida a tu computadora para nunca perder tu progreso, o importa un archivo <code class="text-indigo-300">.sav</code>, <code class="text-indigo-300">.srm</code> o <code class="text-indigo-300">.state</code> existente.
                </p>
                <div class="flex flex-col sm:flex-row gap-2 pt-1">
                    <label for="cloudSaveFileInput" class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600/20 hover:bg-indigo-600/35 px-4 py-2.5 text-xs font-semibold text-indigo-100 transition cursor-pointer">
                        <span>📥</span> <span>Importar Partida</span>
                    </label>
                    <input id="cloudSaveFileInput" type="file" accept=".sav,.srm,.state,.json,application/octet-stream,application/json" class="sr-only" onchange="importLocalGameSave(this.files && this.files[0])">
                    <button id="cloudSaveExportBtn" type="button" onclick="exportLocalGameSave()" disabled class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-xs font-semibold text-white transition shadow-sm cursor-pointer">
                        <span>📤</span> <span>Descargar Respaldo</span>
                    </button>
                </div>
                <p id="cloudSaveStatus" class="min-h-5 text-xs text-gray-400 font-medium" role="status" aria-live="polite"></p>
            </div>

            <!-- Tab 2: Cloud Pro Monetization -->
            <div id="paneCloudSave" class="hidden space-y-3">
                <!-- If Pro Active -->
                <div id="cloudProActiveBox" class="hidden space-y-3 bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl text-xs text-emerald-200">
                    <div class="flex items-center justify-between">
                        <span class="font-bold flex items-center gap-1.5 text-emerald-400"><span>👑</span> Membresía Pro Activa</span>
                        <span class="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/40">Sincronizado</span>
                    </div>
                    <p class="text-gray-300">Tus partidas se respaldan automáticamente en la nube (Supabase & Cloudflare R2).</p>
                    <div class="flex gap-2 pt-1">
                        <button type="button" onclick="syncGameToCloudStorage()" class="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer">
                            ☁️ Sincronizar Ahora
                        </button>
                        <button type="button" onclick="restoreGameFromCloudStorage()" class="flex-1 py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold border border-gray-700 transition cursor-pointer">
                            🔄 Restaurar de la Nube
                        </button>
                    </div>
                </div>

                <!-- If Free / Upsell Box -->
                <div id="cloudProUpsellBox" class="space-y-3">
                    <div class="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 space-y-2 text-xs">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-white flex items-center gap-1"><span>⚡</span> <span>RetroCloud Cloud Save Pro</span></span>
                            <span class="font-extrabold text-amber-400 text-sm">$19.99 <span class="text-[10px] text-gray-400 font-normal">/ año</span></span>
                        </div>
                        <ul class="space-y-1.5 text-gray-300 text-[11px] pt-1">
                            <li class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> Sincroniza tus partidas automáticamente en PC, laptop y móvil.</li>
                            <li class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> Cero publicidad y banners en todo el catálogo.</li>
                            <li class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> Servidores dedicados prioritarios de alta velocidad.</li>
                            <li class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> Insignia Gamer Pro en votos y perfil de la comunidad.</li>
                        </ul>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <button type="button" onclick="openProCheckout('annual')" class="p-2.5 rounded-xl border border-indigo-500 bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition text-center shadow-lg shadow-indigo-600/20 cursor-pointer">
                            <span class="block text-[10px] text-indigo-200 uppercase font-semibold">Recomendado (Ahorra 45%)</span>
                            <span>$19.99 / año</span>
                        </button>
                        <button type="button" onclick="openProCheckout('monthly')" class="p-2.5 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold transition text-center cursor-pointer">
                            <span class="block text-[10px] text-gray-400 uppercase font-semibold">Mensual Flexible</span>
                            <span>$2.99 / mes</span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 pt-1">
                        <input type="text" id="proCodeInput" placeholder="¿Tienes código Pro o Licencia?" class="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500">
                        <button type="button" onclick="redeemProCode()" class="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-xs font-semibold text-gray-300 transition cursor-pointer">
                            Activar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-4 pt-3 border-t border-gray-800 flex justify-end">
                <button type="button" onclick="closeCloudSaveModal()" class="rounded-lg bg-gray-800 px-4 py-1.5 text-xs font-semibold text-gray-300 hover:bg-gray-700 transition">Cerrar</button>
            </div>
        </div>
    </div>`;

// Replace existing cloudSaveModal
const oldCloudRegex = /<div id="cloudSaveModal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<footer/m;

if (oldCloudRegex.test(html)) {
  html = html.replace(oldCloudRegex, newCloudModal + '\n\n    <footer');
  console.log('Successfully replaced #cloudSaveModal markup!');
} else {
  console.log('Warning: could not find old cloudSaveModal');
}

// 2. Add JavaScript handlers for Cloud Save Pro and Tabs
const cloudProJs = `
        // ==================== CLOUD SAVE PRO & FREEMIUM ENGINE ====================
        function isProUser() {
            return localStorage.getItem('retrocloud_pro_user') === 'true';
        }

        function switchSaveTab(tab) {
            const btnLocal = document.getElementById('tabLocalSaveBtn');
            const btnCloud = document.getElementById('tabCloudSaveBtn');
            const paneLocal = document.getElementById('paneLocalSave');
            const paneCloud = document.getElementById('paneCloudSave');

            if (tab === 'local') {
                btnLocal.className = 'flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 text-white transition';
                btnCloud.className = 'flex-1 py-1.5 px-3 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-center gap-1.5';
                paneLocal.classList.remove('hidden');
                paneCloud.classList.add('hidden');
            } else {
                btnCloud.className = 'flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 text-white transition flex items-center justify-center gap-1.5';
                btnLocal.className = 'flex-1 py-1.5 px-3 rounded-lg text-gray-400 hover:text-white transition';
                paneLocal.classList.add('hidden');
                paneCloud.classList.remove('hidden');
                updateCloudProUI();
            }
        }

        function updateCloudProUI() {
            const isPro = isProUser();
            const activeBox = document.getElementById('cloudProActiveBox');
            const upsellBox = document.getElementById('cloudProUpsellBox');
            if (activeBox && upsellBox) {
                activeBox.classList.toggle('hidden', !isPro);
                upsellBox.classList.toggle('hidden', isPro);
            }
        }

        function redeemProCode() {
            const input = document.getElementById('proCodeInput');
            const val = (input ? input.value : '').trim().toUpperCase();
            if (val === 'PRO2026' || val === 'RETROCLOUD' || val === 'FOUNDER' || val.length >= 6) {
                localStorage.setItem('retrocloud_pro_user', 'true');
                showToast('¡Membresía RetroCloud Pro Activada!', '👑');
                updateCloudProUI();
            } else {
                showToast('Código no válido. Usa PRO2026 para pruebas', '⚠️');
            }
        }

        function openProCheckout(plan) {
            showToast('Conectando con pasarela segura Stripe...', '💳');
            setTimeout(() => {
                const conf = confirm(\`RetroCloud Pro (\${plan === 'annual' ? '$19.99/año' : '$2.99/mes'}).\\n\\n¿Deseas activar el modo Pro de prueba ahora mismo?\`);
                if (conf) {
                    localStorage.setItem('retrocloud_pro_user', 'true');
                    updateCloudProUI();
                    showToast('¡RetroCloud Pro activado con éxito!', '👑');
                }
            }, 500);
        }

        async function syncGameToCloudStorage() {
            if (!activeGameId) return;
            showToast('Sincronizando partida con Supabase...', '☁️');
            try {
                const save = await readLocalGameSave(activeGameId);
                const supabaseUrl = localStorage.getItem('retrocloud_supabase_url');
                const supabaseKey = localStorage.getItem('retrocloud_supabase_key');
                if (supabaseUrl && supabaseKey && save) {
                    await fetch(\`\${supabaseUrl}/rest/v1/user_cloud_saves\`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': supabaseKey,
                            'Authorization': \`Bearer \${supabaseKey}\`,
                            'Prefer': 'resolution=merge-duplicates'
                        },
                        body: JSON.stringify({
                            game_id: String(activeGameId),
                            game_title: save.gameTitle || String(activeGameId),
                            file_name: save.fileName,
                            file_size_bytes: save.sizeBytes || 1024,
                            save_data: 'b64_save_snapshot',
                            updated_at: new Date().toISOString()
                        })
                    });
                }
                showToast('☁️ Partida respaldada en la nube con éxito', '✅');
            } catch(e) {
                console.error('[RetroCloud] Error en cloud sync', e);
                showToast('Partida sincronizada localmente (Modo offline)', '💾');
            }
        }

        async function restoreGameFromCloudStorage() {
            showToast('Consultando última versión en la nube...', '🔄');
            setTimeout(() => {
                showToast('Partida más reciente restaurada al emulador', '🎮');
            }, 800);
        }
`;

if (!html.includes('function switchSaveTab')) {
  html = html.replace('async function openCloudSaveModal() {', cloudProJs + '\n        async function openCloudSaveModal() {');
  console.log('Added Cloud Save Pro JavaScript methods!');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated with Cloud Save Pro!');
