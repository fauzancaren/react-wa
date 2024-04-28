const path = require('path');   
const rootPath = path.resolve(__dirname, '../'); 
const socketFolderPath = path.join(rootPath, 'socketio'); 
const socketIO = path.join(socketFolderPath, 'base.js'); 
const {getIO} = require(socketIO);
const waSessionFile = require("./session"); 
const qrcode = require('qrcode'); 
const socket = getIO(); 

function handleQR(qr,id) { 
    qrcode.toDataURL(qr, (err, url) => {
        console.log(`QR RECEIVED ${id}`, qr); 
        waSessionFile.updateDataById(id,{
            id : id, 
            status: "qr", 
            detail : {src: url,text: 'Click for scan...!!!' }
        });
        socket.emit('qr', { id: id, status: "qr", detail : {src: url,text: 'Click for scan...!!!' }});  
    });

   
}
function handleReady(id) {
    console.log(`Client is ready ${id}` );  
    waSessionFile.updateDataById(id,{
        id : id, 
        status: "ready", 
        detail : {text: 'Whatsapp is ready!' }
    });
    socket.emit('ready', { id: id, status: "ready", detail : {text: 'Whatsapp is ready!' }});   
    
} 
async function handleDisconect(reason,id){
    console.log(`Client was logged out ${id}`, reason);  
    waSessionFile.removeDataById(id);
    socket.emit('disconnected', { id: id, status: "disconnected", detail : {text: 'Whatsapp is disconnected!'}});
} 
function handleLoadingScreen(percent, message,id) {
    console.log(`LOADING SCREEN  ${id}`, percent, message);  
    waSessionFile.updateDataById(id,{
        id : id, 
        status: "loading_screen", 
        detail : {percent:percent,text:message }
    });
    socket.emit('loading_screen', { id: id, status: "loading_screen", detail : {percent:percent,text:message}});   
} 
function handleAuthfailure(msg,id) {
    console.log(`AUTHENTICATION FAILURE  ${id}`, msg); 
    waSessionFile.updateDataById(id,{
        id : id, 
        status: "auth_failure", 
        detail : {text:msg }
    });
    socket.emit('auth_failure', { id: id, status: "auth_failure", detail : {text:msg}});   
}
function handleAuthenticated(id) {
    console.log(`AUTHENTICATED  ${id}`); 
    waSessionFile.updateDataById(id,{
        id : id, 
        status: "authenticated", 
        detail : {}
    });
    socket.emit('authenticated', { id: id, status: "authenticated", detail : {text:"Authentication"}});   
}

function handleMessage(msg,id) {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    
} 
function handleMessageCreate(msg,id) {
    console.log(msg);
} 
module.exports = {
    handleReady,
    handleQR,
    handleMessage,
    handleLoadingScreen,
    handleAuthenticated,
    handleAuthfailure, 
    handleDisconect,
    handleMessageCreate
}; 