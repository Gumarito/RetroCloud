const https = require('https');
const fs = require('fs');

https.get('https://pixelsuft.github.io/hl/xash.html', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    // Modify to make it clean and auto-launching
    let modified = data;
    // Add base tag so relative files load from pixelsuft.github.io/hl/
    modified = modified.replace('<head>', '<head>\n\t<base href="https://pixelsuft.github.io/hl/">');
    
    // Hide the technical options form completely with CSS
    const hideCss = `
		#fSettings, #optionsTitle, #asyncDialog, hr { display: none !important; }
		body { background: #0b0f19 !important; color: #e2e8f0 !important; }
    `;
    modified = modified.replace('</style>', `${hideCss}\n\t</style>`);

    // Override default memory to 256MB for peak performance
    modified = modified.replace('var mem = 150;', 'var mem = 256;');

    // Auto-launch startXash on window load!
    const autoLaunch = `
	<script>
		window.addEventListener('load', function() {
			console.log('[RetroCloud] Auto-lanzando Half-Life con 256MB RAM optimizada...');
			setTimeout(function() {
				if (typeof startXash === 'function') {
					startXash();
				}
			}, 300);
		});
	</script>
</body>`;
    modified = modified.replace('</body>', autoLaunch);

    fs.mkdirSync('games/half-life', { recursive: true });
    fs.writeFileSync('games/half-life/index.html', modified, 'utf8');
    console.log('Successfully created games/half-life/index.html with auto-launch and 256MB RAM!');
  });
});
