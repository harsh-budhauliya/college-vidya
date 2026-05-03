const fs = require('fs');
const html = fs.readFileSync('amity_mba.html', 'utf8');
const matches = html.match(/₹[0-9,]+/g) || html.match(/[0-9,]{5,}/g);
if (matches) {
    console.log(matches.slice(0, 50));
}
