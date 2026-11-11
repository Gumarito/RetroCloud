const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const missing = ['crtFilterBtn', 'modalReportText', 'modalMoreActions', 'cinemaModeBtn', 'cinemaModeText'];

lines.forEach((l, i) => {
  missing.forEach(id => {
    if (l.includes(id)) {
      console.log(`${i + 1}: [${id}] -> ${l.trim()}`);
    }
  });
});
