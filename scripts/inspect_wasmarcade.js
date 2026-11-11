async function checkUrl(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`\nURL: ${url} (Status: ${res.status})`);
    const match = text.match(/<iframe[^>]*src=["']([^"']+)["']/i);
    if (match) {
      console.log('Direct iframe found:', match[1]);
    } else {
      console.log('No direct iframe found. Preview:', text.slice(0, 300).replace(/\s+/g, ' '));
    }
  } catch (err) {
    console.error('Error fetching', url, err.message);
  }
}

async function run() {
  await checkUrl('https://wasmarcade.app/play/kingdom-rush');
  await checkUrl('https://wasmarcade.app/play/stick-war');
  await checkUrl('https://wasmarcade.app/play/raft-wars-2');
  await checkUrl('https://wasmarcade.com/gta3');
}

run();
