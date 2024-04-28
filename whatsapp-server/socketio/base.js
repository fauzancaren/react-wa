const { Server } = require("socket.io");
const ioClientConfig  = require('./config');
let io = null;

// Fungsi untuk menginisialisasi Socket.IO dengan server HTTP
function initIO(httpServer) {
    io = new Server(httpServer, ioClientConfig);
    return io;
}

// Fungsi untuk mendapatkan instance Socket.IO
function getIO() {
    if (!io) {
        throw new Error("Socket.IO not initialized!");
    }
    return io;
}

module.exports = { initIO, getIO };