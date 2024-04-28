const express = require('express');
const router = express.Router();
const path = require('path');

function init_app(app){ 
    app.use(express.json({limit: '500mb'}));
    app.use(express.urlencoded({ extended: true,limit: '500mb' }));
    app.use(express.static(path.join(__dirname, 'public')));
}   
  
// ROOT PAGE SERVER 
router.get("/", (req, res) => {  
    res.redirect('/dashboard'); 
})
router.get("/dashboard", (req, res) => {  
    res.sendFile(path.join(__dirname, 'public','menu.html')); 
})
router.get("/account", (req, res) => {  
    res.sendFile(path.join(__dirname, 'public','menu.html')); 
}) 
router.get("/informasi", (req, res) =>  {  
    res.sendFile(path.join(__dirname, 'public','menu.html')); 
}) 
router.get("/deploy",async (req, res,next) => {   
    const cmd_1 = await exec("echo $PWD");
    const cmd_2 = await exec("whoami");
    const cmd_3 = await exec("git pull");
    const cmd_4 = await exec("git status");
    const cmd_5 = await exec("git submodule sync");
    const cmd_6 = await exec("git submodule update");
    const cmd_7 = await exec("git submodule status");

    const payload = {
    cmd_1,
    cmd_2,
    cmd_3,
    cmd_4,
    cmd_5,
    cmd_6,
    cmd_7,
    }; 

    console.log(payload);  
    res.status(200).json(payload);  
    //res.sendFile(path.join(__dirname, 'public','deploy.php')); 
}) 

//FUNCTION GET DATA
router.post("/get-menu", (req, res) => {
    let menu = req.body.menu;
    switch (menu){
    case "dashboard":   
        res.sendFile(path.join(__dirname, 'public', 'content','dashboard.html')); 
        break;
    case "informasi":   
        res.sendFile(path.join(__dirname, 'public', 'content','informasi.html')); 
        break; 
    default:
        res.sendFile(path.join(__dirname, 'public', 'content','account.html')); 
        break;  
    };  
}) 

router.post('/send-media',async(req,res) =>{
    const sender = req.body.sender;
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;
    const media = req.body.media;
    const url = req.body.url;  
    try{
        const client = sessions.find(sess => sess.id == sender).client;
        if (!client) {
        return res.status(422).json({
            status: false,
            message: `The sender: ${sender} is not found!`
        })
        }  
        const image = await new MessageMedia("image/jpeg", media, "image.jpg"); 
        await client.sendMessage(number, image, { caption: message }).then(response => {
            res.status(200).json({
                status: true,
                response: response
            });
        }).catch(err => {
            res.status(500).json({
                status: false,
                response: err
            });
        });
    }catch(err){
        console.log(err);

    return res.status(422).json({
        status: false,
        message: `Error catch : ${sender} | error`
    })
    }
})
router.post('/send-message', async (req, res) => {
    console.log(req);

    const sender = req.body.sender;
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;
    const url = req.body.url; 
    try{
    
    const client = sessions.find(sess => sess.id == sender).client;
    
    // Make sure the sender is exists & ready
    if (!client) {
    return res.status(422).json({
        status: false,
        message: `The sender: ${sender} is not found!`
    })
    }  
    if(url){
        let button = new Buttons(message,[{body:'Login',url:url}],'','');
        client.sendMessage(number, button).then(response => {
            res.status(200).json({
            status: true,
            response: response
            });
        }).catch(err => {
            res.status(500).json({
            status: false,
            response: err
            });
        });
    }else{
        client.sendMessage(number, message).then(response => {
            res.status(200).json({
            status: true,
            response: response
            });
        }).catch(err => {
            res.status(500).json({
            status: false,
            response: err
            });
        });
    }
    }catch(err){
    return res.status(422).json({
        status: false,
        message: `The sender: ${sender} is not found!`
    })
    }
    
});
router.post('/send-approval', async (req, res) => {
    console.log(req);

    const sender = req.body.sender;
    const number = "120363128493445631@g.us";
    const message = req.body.message;
    const url = req.body.url; 
    const id_sales = req.body.id; 
    const type = req.body.type; 

    const client = sessions.find(sess => sess.id == sender).client;

    // Make sure the sender is exists & ready
    if (!client) {
    return res.status(422).json({
        status: false,
        message: `The sender: ${sender} is not found!`
    })
    }   
    let button = new Buttons(message,[{body:type,id:id_sales}],type,'obi-system.com');
    client.sendMessage(number, button).then(response => {
    res.status(200).json({
        status: true,
        response: response
    });
    }).catch(err => {
    res.status(500).json({
        status: false,
        response: err
    });
    });

    
});

router.use(function(req, res) {
    res.redirect('/dashboard'); 
}); 




module.exports = {  init_app,router}