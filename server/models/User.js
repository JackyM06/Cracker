const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    company:{type:String},
    introduction:{type:String},
    followers:[{type:mongoose.SchemaTypes.ObjectId,ref:"User"}],
    fans:[{type:mongoose.SchemaTypes.ObjectId,ref:"User"}],
    articles:[{type:mongoose.SchemaTypes.ObjectId,ref:"Article"}],
    fans_size:{type:Number,default:0},
    followers_size:{type:Number,default:0},
    articles_size:{type:Number,default:0},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
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