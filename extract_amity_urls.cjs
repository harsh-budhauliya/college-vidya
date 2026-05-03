const fs = require('fs');

const html = fs.readFileSync('amity.html', 'utf8');
const nextDataChunks = [];

// Create a mock window/self object to capture the pushes
const self = {
    __next_f: {
        push: (chunk) => {
            if (chunk[1] && typeof chunk[1] === 'string') {
                nextDataChunks.push(chunk[1]);
            } else if (Array.isArray(chunk[1]) && chunk[1][0] === '$') {
                nextDataChunks.push(JSON.stringify(chunk));
            }
        }
    }
};

const scriptRegex = /<script>self\.__next_f\.push\((.*?)\)<\/script>/g;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
    try {
        const arg = JSON.parse(match[1]);
        self.__next_f.push(arg);
    } catch (e) {
        // Evaluate it safely
        try {
            eval(`self.__next_f.push(${match[1]})`);
        } catch(e2) {}
    }
}

let fullStr = nextDataChunks.join('');

// Now we look for all "url":"<path>" in the full text string
let urls = new Set();
const urlRegex = /"url":"([^"]+)"/g;
while ((match = urlRegex.exec(fullStr)) !== null) {
    let url = match[1];
    if (!url.startsWith('http') && !url.startsWith('#') && !url.startsWith('/') && !url.includes('.css') && !url.includes('.js') && !url.includes('.woff')) {
        urls.add(url);
    }
}

console.log("Extracted URLs:", urls);
fs.writeFileSync('amity_urls.json', JSON.stringify(Array.from(urls), null, 2));

