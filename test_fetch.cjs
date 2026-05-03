const fs = require('fs');

async function testFetch() {
    const res = await fetch('https://amityonline.com/mba-internationalfinance', {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    });
    const html = await res.text();
    fs.writeFileSync('test_intl_finance.html', html);
    console.log("Saved to test_intl_finance.html");
}

testFetch();
