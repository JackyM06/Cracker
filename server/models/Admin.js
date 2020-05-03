const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    name:{type:String},
    teleNumber:{type:String},
    desc:{type:String},
    avatar:{type:String},
    password:{
        type:String,
        select:false,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    },
    level:{type:mongoose.SchemaTypes.ObjectId,ref:"AdminLevel"}
})

module.exports = mongoose.model("Admin",sechma)