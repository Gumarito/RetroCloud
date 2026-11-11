const fs = require('fs');

function seedVotes(file) {
  if (!fs.existsSync(file)) return;
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  list.forEach(g => {
    // Generate realistic likes and dislikes
    // Base on rating if available, else popularity or default
    const r = typeof g.rating === 'number' ? g.rating : 4.2;
    const factor = Math.max(0.6, Math.min(1.0, (r - 2.5) / 2.5));
    
    // Scale between 120 and 2800 likes
    const baseLikes = Math.floor(200 + factor * 2200 + (g.id.length * 17) % 350);
    // Dislikes are typically 2% to 8% of likes
    const dislikePct = 0.02 + (1 - factor) * 0.06;
    const baseDislikes = Math.floor(baseLikes * dislikePct + (g.id.length * 7) % 25);
    
    g.likes = baseLikes;
    g.dislikes = baseDislikes;
    
    // Clean up rating if requested
    delete g.rating;
    delete g.ratingSource;
  });
  fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
  console.log(`Updated ${list.length} games in ${file} with likes & dislikes.`);
}

seedVotes('games.json');
seedVotes('games_pending_repair.json');
seedVotes('games_pending_covers.json');
