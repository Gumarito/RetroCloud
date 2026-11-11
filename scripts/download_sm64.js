const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '..', 'games', 'super-mario-64');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

(async () => {
  const base = 'https://heyitsheart.github.io/sm3das/64/';
  
  // Download JS and WASM
  console.log('Downloading sm64.us.f3dex2e.js...');
  await downloadFile(base + 'sm64.us.f3dex2e.js', path.join(dir, 'sm64.us.f3dex2e.js'));
  console.log('Saved sm64.us.f3dex2e.js');

  console.log('Downloading sm64.us.f3dex2e.wasm...');
  await downloadFile(base + 'sm64.us.f3dex2e.wasm', path.join(dir, 'sm64.us.f3dex2e.wasm'));
  console.log('Saved sm64.us.f3dex2e.wasm');

  // Create clean index.html WITHOUT the alert() and with retro styling
  const cleanHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Super Mario 64 - RetroCloud</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      overflow: hidden;
      image-rendering: pixelated;
    }
    #container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    canvas {
      width: 100vw;
      height: 100vh;
      display: block;
      outline: none;
    }
  </style>
</head>
<body>
  <div id="container">
    <canvas class="emscripten" id="canvas" tabindex="-1"></canvas>
  </div>
  <script type="text/javascript">
    var Module = {
      preRun: [],
      postRun: [],
      print: function(text) { console.log(text); },
      printErr: function(text) { console.error(text); },
      canvas: (function () {
        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas;
      })(),
      setStatus: function (text) {}
    };
  </script>
  <script async type="text/javascript" src="sm64.us.f3dex2e.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), cleanHtml, 'utf8');
  console.log('Clean index.html created successfully (0 alerts, 0 popups)!');
})();
