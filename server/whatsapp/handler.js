const path = require('path');   
const rootPath = path.resolve(__dirname, '../'); 
const socketFolderPath = path.join(rootPath, 'socketio'); 
const socketIO = path.join(socketFolderPath, 'base.js');  
const socket = socketIO.getIO; 

function handleQR(qr,id) { 
    console.log(`QR RECEIVED ${id}`, qr);
    socket.emit("qr",{message :  qr}) 
}
function handleLoadingScreen(percent, message) {
    console.log('LOADING SCREEN', percent, message); 
}
function handleAuthenticated() {
    console.log('AUTHENTICATED');
}
function handleAuthfailure(msg) {
    console.error('AUTHENTICATION FAILURE', msg);
}
function handleReady() {
    console.log('Client is ready!');
}
function handleMessage(msg) {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
}
function handleMessagecreate(msg) {
}
module.exports = {
    handleReady,
    handleQR,
    handleMessage,
    handleLoadingScreen,
    handleAuthenticated,
    handleAuthfailure,
    handleMessagecreate, 
}; 