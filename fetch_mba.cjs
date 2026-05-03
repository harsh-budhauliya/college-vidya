const https = require('https');
const fs = require('fs');

https.get('https://amityonline.com/master-of-business-administration-online', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('amity_mba.html', data);
        console.log("Saved to amity_mba.html. Length:", data.length);
    });
});
