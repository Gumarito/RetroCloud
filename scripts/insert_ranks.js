const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = 'function normalizeCatalogData(payload) {';
const replacement = `const featuredGameOrder = [
            'minecraft-1-8-8',
            'gta-vice-city',
            'doom',
            'super-mario-64',
            'subway-surfers',
            'hollow-knight',
            'tekken-5'
        ];
        const featuredGameRanks = new Map(featuredGameOrder.map((id, index) => [id, index]));
        let currentSort = 'default';

        function normalizeCatalogData(payload) {`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully inserted featuredGameOrder and featuredGameRanks before normalizeCatalogData!');
} else {
  console.log('Target not found');
}
