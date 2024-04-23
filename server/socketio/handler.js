
const path = require('path');   
const rootPath = path.resolve(__dirname, '../'); 
const waFolderPath = path.join(rootPath, 'whatsapp'); 
const waManagerPath = path.join(waFolderPath, 'base.js');  
const waManager = require(waManagerPath);
// Ekspor fungsi yang menerima 'socket' sebagai parameter
module.exports = function(socket) {
    // Logging ketika user terhubung
    console.log(`a user connected ${socket.id}`);


    socket.on("create_session",(data) => { 
        waManager.init(data.number);
        console.log(data);
    });
    // Listener untuk event 'send_message'
    socket.on("send_message", (data) => {
        console.log(data);
        // Broadcast message ke semua clients kecuali pengirim
        socket.broadcast.emit("receive_message", data);
    });

    // Anda bisa menambahkan lebih banyak event listeners di sini
};