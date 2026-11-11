const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Safe changeLanguage implementation with 100% null safety
const safeChangeLanguage = `        function setElemText(id, text) {
            const el = document.getElementById(id);
            if (el && text !== undefined) el.innerText = text;
        }

        function setElemAttr(id, attr, val) {
            const el = document.getElementById(id);
            if (el && val !== undefined) el.setAttribute(attr, val);
        }

        function changeLanguage(lang) {
            currentLang = translations[lang] ? lang : 'en';
            const t = translations[currentLang];
            if (!t) return;

            setElemText('heroTitle', t.heroTitle);
            setElemText('heroSubtitle', t.heroSubtitle);
            
            const sInput = document.getElementById('searchInput');
            if (sInput && t.search) sInput.placeholder = t.search;
            const mInput = document.getElementById('mobileSearchInput');
            if (mInput && t.search) mInput.placeholder = t.search;

            setElemAttr('mobileSearchToggle', 'aria-label', t.searchOpen);
            setElemAttr('mobileSearchClear', 'aria-label', t.searchClear);
            const mClear = document.getElementById('mobileSearchClear');
            if (mClear && t.searchClear) mClear.title = t.searchClear;

            setElemText('pwaInstallText', t.installApp);
            setElemAttr('pwaInstallBtn', 'aria-label', t.installApp);
            const pwaBtn = document.getElementById('pwaInstallBtn');
            if (pwaBtn && t.installApp) pwaBtn.title = t.installApp;

            setElemText('gameLoadingText', t.gameLoading);

            const volumeValue = document.getElementById('modalVolumeSlider')?.value || '70';
            const muteButton = document.getElementById('volumeMuteBtn');
            if (muteButton) {
                const label = Number(volumeValue) === 0 ? t.volumeUnmute : t.volumeMute;
                muteButton.setAttribute('aria-label', label);
                muteButton.title = label;
            }

            // Filtros
            const filterKeyMap = {
                all: 'filterAll',
                mobile: 'filterMobile',
                favorites: 'filterFavorites'
            };

            document.querySelectorAll('#gameFilters button').forEach(button => {
                const key = filterKeyMap[button.dataset.filter];
                if (key && t[key]) {
                    button.innerText = t[key];
                }
            });

            setElemAttr('alphabetJump', 'aria-label', t.alphabetJump);
            if (typeof updateGameViewControls === 'function') updateGameViewControls();

            // Modal Header, Fallback button & Launcher texts
            setElemText('modalCloseBtn', t.close);
            setElemText('modalFullscreenText', t.fullscreen);
            if (typeof setCinemaMode === 'function') {
                const gModal = document.getElementById('gameModal');
                if (gModal) setCinemaMode(gModal.classList.contains('cinema-mode'));
            }
            setElemText('modalFallbackText', t.fallbackOpen);
            setElemAttr('modalFallbackBtn', 'aria-label', t.fallbackOpen);
            setElemText('recentlyPlayedTitle', t.recentTitle);
            setElemText('recentlyPlayedLimit', t.recentLimit);
            setElemText('launcherHeadline', t.launcherTitle);
            setElemText('launcherNotice', t.launcherNotice);
            setElemText('mirrorsLabel', t.mirrorsTitle);
            setElemText('launchBtnText', t.launchBtn);

            // Botones adicionales
            setElemText('randomGameText', t.surpriseMe);
            setElemText('modalShareText', t.share);
            setElemText('modalReloadText', t.restart);
            setElemText('suggestGameText', t.suggestGame);
            setElemText('loadMoreText', t.loadMore);
            setElemText('modalControlsLabel', t.controls);
            setElemText('gamepadNotice', t.gamepadNotice);
            setElemText('footerCopyright', t.footerText);

            document.querySelectorAll('.ad-label').forEach(el => {
                el.innerText = t.adLabel;
            });

            setElemText('catalogHeading', t.catalogHeading);
            setElemText('sortLabel', t.sortLabel);
            setElemText('optSortDefault', t.sortFeatured);
            setElemText('optSortAZ', t.sortAZ);
            setElemText('optSortZA', t.sortZA);
            setElemText('optSortCategory', t.sortCategory);
            setElemText('optSortPopular', t.sortPopular);
            setElemText('themeToggleText', currentTheme === 'light' ? t.themeDark : t.themeLight);
        }`;

const startIdx = html.indexOf('function changeLanguage(');
const endIdx = html.indexOf('function updateFilterButtons', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx) + safeChangeLanguage + '\n\n        ' + html.substring(endIdx);
  console.log('Replaced changeLanguage with 100% null-safe implementation!');
} else {
  console.log('Warning: could not find changeLanguage boundaries');
}

// Add id="mirrorsLabel" to the subtitle in launcher
html = html.replace(
  '<span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Servidores Disponibles:</span>',
  '<span id="mirrorsLabel" class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Servidores Disponibles:</span>'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');
