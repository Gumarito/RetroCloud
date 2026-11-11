const fs = require('fs');
const adminHtml = fs.readFileSync('admin.html', 'utf8');
const sqlFile = fs.readFileSync('supabase_retrocloud_schema.sql', 'utf8');
const idStr = 'id="sqlCodeBlock">';
const startIdx = adminHtml.indexOf(idStr);
const endIdx = adminHtml.indexOf('</pre>', startIdx);
if (startIdx !== -1 && endIdx !== -1) {
  const newAdmin = adminHtml.substring(0, startIdx + idStr.length) + '\n' + sqlFile + '\n' + adminHtml.substring(endIdx);
  fs.writeFileSync('admin.html', newAdmin, 'utf8');
  console.log('Updated sqlCodeBlock in admin.html with master production schema!');
} else {
  console.log('Warning: could not find pre tag in admin.html');
}
