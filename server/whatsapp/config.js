const { LocalAuth } = require('whatsapp-web.js');

module.exports = function(clientId) {
    return {
        restartOnAuthFail: true,
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ],
        },
        authStrategy: new LocalAuth({
            clientId: clientId
        }),
        webVersionCache: {
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2402.5-beta.html',
            type: 'remote'
        }
    };
};
