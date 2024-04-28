
const path = require('path');   
const rootPath = path.resolve(__dirname, '../'); 
const waFolderPath = path.join(rootPath, 'whatsapp'); 
const waManagerPath = path.join(waFolderPath, 'base.js');  
const waManager = require(waManagerPath); 
const waSessiomPath = path.join(waFolderPath, 'session.js');  
const waSessionFile = require(waSessiomPath); 
const {getIO} = require("./base"); 
const io = getIO();
// Ekspor fungsi yang menerima 'socket' sebagai parameter
module.exports = function(socket) {
    // Logging ketika user terhubung 
    socket.code = "Anonymous" +  Math.random() 
    socket.name = "Anonymous" +  Math.random() 
    socket.uuid = "xxxxxxxx-xxxx-xxxx-xxxx-fa23992141a9"
    socket.join('obiserver'); 
     
    /* START EVENT WHATSAPP WEB API */
    socket.on('load-data-whatsapp', function() {
        console.log("load-data-whatsapp from ",socket.id);
        const savedSessions = waSessionFile.loadData();
        if (savedSessions.length > 0) {
            if (socket) {   
               socket.emit('load-data-whatsapp', savedSessions); 
            }
        }  

        const list = waManager.getList();
        console.log(list);
    });
    socket.on('create-data-whatsapp', function(data) {
        console.log('Creating session from web: ' + data.id);
        console.log(data);
        waSessionFile.saveData({
            id : data.id,
            name : data.description,
            status: "new", 
        });
        io.emit('create-data-new', { id: data.id, name: data.description, status: "new_data", detail : {text: 'waiting!'}});
        waManager.init(data.id);
    }); 
    socket.on('remove-data-whatsapp', async function(data) { 
        console.log('remove data whatsapp from web: ' + data.id);  
        const list = waManager.getList(); 
        const client = list.find(sess => sess.id == data.id).client;  
        if (client) {   
            await client.destroy();    
            waSessionFile.removeDataById(data.id);
            io.emit('disconnected', { id: data.id, status: "disconnected", detail : {text: 'Whatsapp is disconnected!'}});
            
        }  
        
    });  
    /* END EVENT WHATSAPP WEB API */

    socket.on("get_all_message", async (data) =>{ 
        console.log("get message ", data);
        const list = waManager.getList(); 
        const client = list.find(sess => sess.id == data.id).client;  
        let chat_activos = await client.getChats();
        console.log("get message ", chat_activos);
        for (const n_chat of chat_activos) { 
            io.emit('get_all_message',n_chat);
            // var n_id = n_chat.id;
            // let mensajes_verificar = await n_chat.fetchMessages(); 
            // for (const n_chat_mensaje of mensajes_verificar) { 
            //     if (!n_chat_mensaje.isGroup) {
            //         es_grupo = 'N';
            //     } else {
            //         es_grupo = 'S';
            //     }
            // }
        }
    });


    socket.on("get_all_socket", async () =>{ 
        var data_user_active = [];
        let roomUsers = await io.in(`obiserver`).fetchSockets() 
        for (const socket2 of roomUsers) {
            data_user_active.push(
            {
                code : socket2.code,
                name: socket2.name,
                uuid: socket2.uuid
            });
        }
        socket.emit("all_socket",data_user_active)
    }); 
    socket.on("login", async (data) => {
        console.log("****** New  Login ******"); 
        console.log(data); 
        console.log("************************"); 
        socket.code = data.code
        socket.name = data.name
        socket.uuid = data.uuid

        let roomUsers = await io.in(`obiserver`).fetchSockets() 
        for (const socket2 of roomUsers) {
            socket2.emit("new_login",
            {
                code : data.code,
                name : data.name,
                uuid : data.uuid
            });
        }
    });
    socket.on("disconnect", async () => {
        const io = getIO();
        console.log("socket is disconnected:" + socket.code);
        let roomUsers = await io.in(`obiserver`).fetchSockets() 
        var readyuser = false;
        for (const socket2 of roomUsers) {
            if (socket2.code == socket.code )  readyuser = true
        }
        if(!readyuser){
            for (const socket2 of roomUsers) {
                socket2.emit("logout",
                {
                    code : socket.code,
                    name : socket.name,
                    uuid : socket.uuid
                });
            }
        } 
        
    }); 
    socket.on("chat_person",async function(data){
        let roomUsers = await io.in(`obiserver`).fetchSockets() 
        for (const socket2 of roomUsers) {
            if(socket2.code == data.code){
                socket2.emit("chat_person",{code : socket.code, message : data.message});
            } 
        }
    })
    // Anda bisa menambahkan lebih banyak event listeners di sini
};