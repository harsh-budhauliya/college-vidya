const fs = require('fs');

async function testFetch() {
    const res = await fetch('https://amityonline.com/mba-internationalfinance', {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    });
    const html = await res.text();
    const nextDataChunks = [];

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
            try {
                eval(`self.__next_f.push(${match[1]})`);
            } catch(e2) {}
        }
    }

    const fullStr = nextDataChunks.join('');
    // Look for fees
    const feesMatch = fullStr.match(/"lumpsumFee":\d+|"semesterFee":\d+|"annualFee":\d+|"feeStructure":\{.*?\}/g);
    console.log("Found fees matches:", feesMatch ? feesMatch.slice(0, 10) : 'None');
    
    // Look for name
    const titleMatch = fullStr.match(/"title":"([^"]+)"/g);
    console.log("Title matches:", titleMatch ? titleMatch.slice(0, 5) : 'None');
}

testFetch();
