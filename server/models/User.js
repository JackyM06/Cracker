const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    company:{type:String},
    introduction:{type:String},
    followes:[{type:mongoose.SchemaTypes.ObjectId,ref:"User"}],
    password:{
        type:String,
        select:false,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User",sechma)