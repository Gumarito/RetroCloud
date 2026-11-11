const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('id="viewQuarantine"')) {
    console.log(idx + 1, l.trim());
  }
});
