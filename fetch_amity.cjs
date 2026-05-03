const https = require('https');

https.get('https://amityonline.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const nextDataMatch = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (nextDataMatch) {
            console.log("Found __NEXT_DATA__!");
            const fs = require('fs');
            fs.writeFileSync('amity_dump.json', nextDataMatch[1]);
        } else {
            console.log("No __NEXT_DATA__ found. Length of HTML: " + data.length);
            const nuxtDataMatch = data.match(/<script[^>]*__NUXT__[^>]*>(.*?)<\/script>/s);
            if (nuxtDataMatch) {
                console.log("Found __NUXT__!");
                const fs = require('fs');
                fs.writeFileSync('amity_dump.txt', nuxtDataMatch[1]);
            }
        }
    });
}).on('error', (err) => {
    console.error(err);
});
