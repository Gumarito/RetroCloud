const https = require('https');

https.get('https://gn-math.dev/?id=468', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for JSON or game lists or endpoints
    const matches = data.match(/https?:\/\/[^\s"']+/g) || [];
    console.log('Total URLs found:', matches.length);
    console.log('Sample URLs:');
    matches.slice(0, 15).forEach(u => console.log('  ', u));
    
    // Look for keywords
    console.log('\nContains hollow?:', data.toLowerCase().includes('hollow'));
    console.log('Contains iframe?:', data.toLowerCase().includes('iframe'));
    console.log('Contains 468?:', data.includes('468'));
  });
}).on('error', err => console.error(err));
