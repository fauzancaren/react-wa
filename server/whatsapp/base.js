
 
 
const { Client } = require('whatsapp-web.js');
const waClientConfig  = require("./config");
const waHandlers  = require("./handler");   
 
function init(id) {
    const client = new Client(waClientConfig(id)); 
 
    client.on('qr',  (qr) => waHandlers.handleQR(qr,id));
    client.on('ready', waHandlers.handleReady);
    client.on('message', waHandlers.handleMessage);
    client.initialize();
    return;
}  

module.exports = { init };