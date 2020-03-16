const mongoose = require("mongoose")
const schame = new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    author:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    visits:{type:Number}
},{
    timestamps:true
})

module.exports = mongoose.model('Notice',schame)