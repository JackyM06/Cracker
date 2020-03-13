const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    name:{type:String},
    teleNumber:{type:String},
    password:{type:String},
    
})

module.exports = mongoose.model("User",sechma)