const mongoose = require("mongoose")
const schame = new mongoose.Schema({
    title:{type:String},
    content:{
        type:String,
        select:false
    },
    author:{type:mongoose.SchemaTypes.ObjectId,ref:'Admin'},
    editor:{type:mongoose.SchemaTypes.ObjectId,ref:'Admin'},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    visits:{type:Number,default:0}
},{
    timestamps:true
})

module.exports = mongoose.model('Notice',schame)