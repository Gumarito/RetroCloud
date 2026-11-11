const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

function findSnippet(keyword) {
  console.log(`\n=== Snippet for: "${keyword}" ===`);
  lines.forEach((l, i) => {
    if (l.includes(keyword)) {
      console.log(`Line ${i + 1}: ${l}`);
      for (let j = Math.max(0, i - 1); j <= Math.min(lines.length - 1, i + 8); j++) {
        console.log(`  ${j + 1}: ${lines[j]}`);
      }
    }
  });
}

findSnippet('scrollbar-none');
findSnippet('modalVoteWidget');
findSnippet('gameFilters');
findSnippet('renderModalRecommendations');
findSnippet('initGameVolume(game.id)');
