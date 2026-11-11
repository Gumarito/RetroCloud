async function checkAssets() {
  const res = await fetch('https://woahhcrackers.github.io/CupheadWeb/');
  const html = await res.text();
  const buildFiles = html.match(/Build\/[^"']+/g) || [];
  console.log('Build files found:', buildFiles);
  for (const f of buildFiles.slice(0, 4)) {
    const assetUrl = 'https://woahhcrackers.github.io/CupheadWeb/' + f;
    const aRes = await fetch(assetUrl, { method: 'HEAD' });
    console.log(f, '-> status:', aRes.status, 'size:', aRes.headers.get('content-length'));
  }
}
checkAssets();
