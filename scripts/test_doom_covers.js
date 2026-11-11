const https = require('https');

async function testImg(u) {
  return new Promise(r => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      r({ u, status: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', e => r({ u, err: e.message }));
  });
}

async function run() {
  const urls = [
    'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg',
    'https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy_Advance/master/Named_Boxarts/Doom%20(USA%2C%20Europe).png',
    'https://raw.githubusercontent.com/libretro-thumbnails/DOS/master/Named_Boxarts/Doom%20(1993).png',
    'https://moddb.mediacdn.media/images/mods/1/14/13936/brutal_doom_v21_banner.jpg'
  ];
  for (const u of urls) console.log(await testImg(u));
}
run();
