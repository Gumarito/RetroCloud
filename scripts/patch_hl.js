const fs = require('fs');
let hlHtml = fs.readFileSync('games/half-life/index.html', 'utf8');

// 1. Force mem default to 256
hlHtml = hlHtml.replace(
  /mem = Math\.round\(window\.location\.hash\.substring\(1\)\);/g,
  'mem = Math.round(window.location.hash.substring(1)) || 256; if (mem < 256) mem = 256;'
);

// 2. Hide options elements permanently in skipRun
hlHtml = hlHtml.replace(/showElement\('optionsTitle',\s*true\);/g, "showElement('optionsTitle', false);");
hlHtml = hlHtml.replace(/showElement\('fSettings',\s*true\);/g, "showElement('fSettings', false);");
hlHtml = hlHtml.replace(/showElement\('idbHider',\s*true\);/g, "showElement('idbHider', false);");

// 3. Auto start when moduleCount == 3
if (hlHtml.includes('Module.setStatus("Scripts downloaded!");')) {
  hlHtml = hlHtml.replace(
    'Module.setStatus("Scripts downloaded!");',
    'Module.setStatus("Iniciando Half-Life..."); setTimeout(function() { try { startXash(); } catch(e){ console.error(e); } }, 80);'
  );
  console.log('Hooked moduleCount == 3 to auto-start startXash()!');
} else {
  console.log('Warning: could not find Scripts downloaded string');
}

// 4. Ensure CSS hides all forms completely
const cssRule = '<style>\n\t\t#fSettings, #optionsTitle, #asyncDialog, hr, #idbHider, #label_show_console_log, #bLaunch { display: none !important; }';
if (!hlHtml.includes('#bLaunch')) {
  hlHtml = hlHtml.replace('<style>', cssRule);
}

fs.writeFileSync('games/half-life/index.html', hlHtml, 'utf8');
console.log('Half-Life wrapper updated successfully!');
