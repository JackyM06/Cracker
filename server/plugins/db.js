module.exports = (app)=>{
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/cracker",{
        useNewUrlParser:true,
        useUnifiedTopology:true},
        (err)=>{
        if(err){
            console.log("连接失败")
        }else{
            console.log("连接成功")
        }
        require('require-all')(__dirname+'/../models')
    })
}