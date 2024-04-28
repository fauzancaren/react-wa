const response = (status,data, message,res) =>{
    res.status(status).json({
        payload:{
            status_code: status,
            data: data,
            message: message
        },
        pagination: {
            prev: "",
            next: "",
            max: ""
        }
    })
}
module.exports = response