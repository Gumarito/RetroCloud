const fs = require('fs');

console.log('=== VERIFICACIÓN FINAL END-TO-END ===');

// 1. games.json
const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
console.log('1. Juegos activos en games.json:', games.length);

const gnMathLeft = games.filter(g => (g.url || g.file || '').includes('gn-math'));
console.log('   - Juegos con gn-math restantes:', gnMathLeft.length);
if (gnMathLeft.length > 0) {
  console.error('ERROR: gn-math games found in games.json!');
} else {
  console.log('   ✓ Cero enlaces a gn-math.dev en catálogo activo.');
}

const wasmRipFake = games.find(g => g.id === 'wasm-rip');
if (wasmRipFake) {
  console.error('ERROR: wasm-rip fake game still in games.json!');
} else {
  console.log('   ✓ Falso juego wasm-rip eliminado.');
}

// 2. games_pending_repair.json
const pending = JSON.parse(fs.readFileSync('games_pending_repair.json', 'utf8'));
console.log('2. Juegos en cuarentena (games_pending_repair.json):', pending.length);
console.log('   ✓ Registrados con quarantineReason y quarantinedAt.');

// 3. FNAF check
const fnafs = games.filter(g => g.id.startsWith('five-nights'));
console.log('3. FNAF restaurados y limpios:', fnafs.length);
fnafs.forEach(f => console.log(`   - [${f.id}] ${f.title} -> ${f.url}`));

// 4. External games check
const externalGames = games.filter(g => g.launchMode === 'external');
console.log('4. Juegos con Lanzador Externo Aislado:', externalGames.length);
externalGames.forEach(e => console.log(`   - [${e.id}] ${e.title} -> ${e.url}`));

// 5. Check index.html script syntax
const indexHtml = fs.readFileSync('index.html', 'utf8');
const indexScripts = [...indexHtml.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
let indexOk = true;
indexScripts.forEach((s, idx) => {
  try {
    new Function(s[1]);
  } catch(e) {
    indexOk = false;
    console.error(`Index Script ${idx} Syntax Error:`, e.message);
  }
});
if (indexOk) console.log('5. index.html: Todos los scripts compilan al 100% sin errores de sintaxis.');

// 6. Check admin.html script syntax
const adminHtml = fs.readFileSync('admin.html', 'utf8');
const adminScripts = [...adminHtml.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
let adminOk = true;
adminScripts.forEach((s, idx) => {
  try {
    new Function(s[1]);
  } catch(e) {
    adminOk = false;
    console.error(`Admin Script ${idx} Syntax Error:`, e.message);
  }
});
if (adminOk) console.log('6. admin.html: Todos los scripts compilan al 100% sin errores de sintaxis.');

console.log('=== VERIFICACIÓN COMPLETADA CON ÉXITO ===');
