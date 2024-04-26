
 
 
const { Client } = require('whatsapp-web.js');
const waClientConfig  = require("./config");
const waHandlers  = require("./handler");   
let listclient = [];

function init(id) {
    const client = new Client(waClientConfig(id)); 
    
    // start handle setup pertama kali scan barcode
    client.on('qr',  (qr) => waHandlers.handleQR(qr,id));
    client.on('ready',() => waHandlers.handleReady(id));
    client.on('disconnected', (reason) => waHandlers.handleDisconect(reason,id)); 
    client.on('loading_screen', (percent,msg) => waHandlers.handleLoadingScreen(percent,msg,id)); 
    client.on('auth_failure',(msg) => waHandlers.handleAuthfailure(msg,id));
    client.on('authenticated', () => waHandlers.handleAuthenticated(id));
    // end handle setup pertama kali scan barcode

    client.on('message', (msg) => waHandlers.handleMessage(msg,id));
    client.on('message_create', (msg) => waHandlers.handleMessageCreate(msg,id));
    client.initialize();

    
    listclient.push({
        id: id, 
        client: client
    }); 
    
    return;
}  
function getList(){
    return listclient;
}
function setList(sessionlist){ 
    listclient = sessionlist; 
    return;
}

module.exports = { init,getList,setList };