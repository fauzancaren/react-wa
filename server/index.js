const express = require("express")
const app = express()
const port = 3001 
const mysql = require('mysql2/promise');
const dbConfig = require("./connection")
const response = require("./response") 
const {decryptPassword,encryptPassword} = require("./password")
var cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true,limit: '500mb' })); 
app.use(cors())

app.post('/auth/login',(req,res)=>{
    setTimeout(async ()=>{
        const username = req.body.username;
        const password = encryptPassword(req.body.password);
        try { 
            //cek username ready
            const connection = await mysql.createConnection(dbConfig);
            const [users] = await connection.execute(
                'SELECT * FROM TblMsEmployee WHERE MsEmpIsActive = 1 AND MsEmpCode = ?',
                [username]
            ); 
            if (users.length === 0) { 
                response(201, {}, "User tidak ditemukan", res)  
                await connection.end(); 
                return  
            } 
            const [pasword] = await connection.execute(
                'SELECT * FROM TblMsEmployee WHERE MsEmpIsActive = 1 AND MsEmpCode = ? and MsEmpPass = ?',
                [username,password]
            ); 
            if (pasword.length === 0) { 
                response(202, {}, "Password tidak cocok", res)  
                await connection.end(); 
                return  
            } 
            response(200, pasword, "User found", res)  
        } catch (error) {
            console.error('Database error:', error);
            response(500, {}, "Internal server error", res) 
        }
    },3000);
})
app.post('/',(req,res) =>{
    console.log(req.body)
    db.query("select * from TblMsEmployee", (error,result) =>{
        response(200, result, "get all data karyawan", res) 
    }) 
}) 

app.listen(port,() =>{
    console.log(`example server create port ${port}`)
})