const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let scriptCode = '';
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  if (count === 3) {
    scriptCode = match[2];
  }
}

const storage = {};
global.localStorage = {
  getItem: k => storage[k] || null,
  setItem: (k, v) => storage[k] = String(v),
  removeItem: k => delete storage[k]
};
global.sessionStorage = {
  getItem: k => storage[k] || null,
  setItem: (k, v) => storage[k] = String(v),
  removeItem: k => delete storage[k]
};

const domElements = {
  gamesGrid: { setAttribute: () => {}, innerHTML: '', querySelectorAll: () => [], classList: { add: () => {}, remove: () => {}, toggle: () => {} }, addEventListener: () => {} },
  paginationContainer: { classList: { add: () => {}, remove: () => {} } },
  paginationInfo: { innerText: '' },
  resultsCountBadge: { innerText: '' },
  alphabetJump: { classList: { toggle: () => {} } },
  alphabetJumpList: { addEventListener: () => {}, innerHTML: '' },
  recentlyPlayedList: { addEventListener: () => {}, innerHTML: '' },
  modalRecList: { addEventListener: () => {}, innerHTML: '' },
  langSelect: { value: 'es' },
  searchInput: { value: '' },
  sortSelect: { value: 'default' },
  gameSearchInput: { value: '' },
  sortBySelect: { value: 'plays' },
  mobileFilterNotice: { classList: { toggle: () => {} } },
  gamePlayerContainer: { classList: { toggle: () => {}, add: () => {}, remove: () => {} }, addEventListener: () => {} }
};

global.document = {
  getElementById: (id) => domElements[id] || { setAttribute: () => {}, addEventListener: () => {}, classList: { add: () => {}, remove: () => {}, toggle: () => {} }, innerHTML: '', innerText: '', value: '' },
  querySelectorAll: () => [],
  querySelector: () => ({ setAttribute: () => {}, querySelector: () => ({ innerText: '' }), querySelectorAll: () => [] }),
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') {
      global._onDOMContentLoaded = cb;
    }
  },
  documentElement: { classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} } },
  body: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
};

global.window = {
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') {
      global._onDOMContentLoaded = cb;
    }
  },
  matchMedia: () => ({ matches: false }),
  location: { search: '' }
};

global.navigator = { language: 'es-ES', userAgent: 'Mozilla/5.0' };

global.fetch = async (url) => {
  if (url.includes('games.json')) {
    const raw = fs.readFileSync('games.json', 'utf8');
    return {
      ok: true,
      json: async () => JSON.parse(raw)
    };
  }
  return { ok: true, json: async () => ({}) };
};

console.log('Testing script execution in mock environment...');
try {
  eval(scriptCode);
  console.log('Script parsed and evaluated without error.');
} catch (e) {
  console.error('ERROR during script evaluation:', e);
  process.exit(1);
}

async function testInit() {
  console.log('Testing DOMContentLoaded step by step...');
  try {
    if (global._onDOMContentLoaded) {
      await global._onDOMContentLoaded();
      console.log('DOMContentLoaded executed!');
    } else {
      console.log('No _onDOMContentLoaded found!');
    }
  } catch (e) {
    console.error('ERROR in DOMContentLoaded:', e);
  }
}

testInit();
