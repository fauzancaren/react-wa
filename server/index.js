


const express = require("express");
const http = require("http"); 
 
const socketManager = require('./socketio/base');
const ioClientHandles  = require('./socketio/handler');  


const waSessionFile = require("./whatsapp/session"); 
const waManager = require('./whatsapp/base');

const app = express(); // CREATE WEB  
const port = process.env.NODE_PORT || 2000; 
const server = http.createServer(app); 
const io = socketManager.init(server); 

io.on("connection", (socket) => {
    ioClientHandles(socket); 
}); 
 
let dataSession = waSessionFile.loadData(); 
dataSession.forEach(session => {
    waManager.init(session.number) 
});

waManager.init("123456789") 











// const myData = {
//     id: "test2",
//     name: 30,
//     status: ["reading", "gaming", "hiking"]
// }; 

// sessionFile.saveData(myData);

// // Data yang akan disimpan
// const myData1 = {
//     id: "test2",
//     name: 30,
//     status: ["reading", "gaming", "hiking"]
// }; 
// saveData(myData1);


// const clientConfig = waClientConfig("0895352992663");
// const client = new Client(clientConfig);
// client.on('qr', waHandlers.handleQR);
// client.on('ready', waHandlers.handleReady);
// client.on('message', waHandlers.handleMessage);
// client.initialize();

// sessionFile.removeDataById("test2");
// console.log('Loaded Data:', sessionFile.loadData());
// sessionFile.updateDataById("test1", { name: 31, status: ["cycling", "test"] });
// console.log('Loaded Data:', sessionFile.loadData());

server.listen(port,()=>{
    console.log("server start")
});