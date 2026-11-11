const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const elements = [
  'modalMoreActions',
  'sharePopover',
  'modalShareBtn',
  'modalGameTitle',
  'modalGameBadge',
  'modalGameSummary',
  'modalGameNote',
  'modalControlsList',
  'modalFallbackBtn',
  'gameFrame',
  'externalLauncher',
  'modalVolumeControl',
  'gameModal'
];

elements.forEach(id => {
  const exists = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  console.log(id, exists ? 'EXISTS' : 'MISSING !!!');
});
