const mongoose = require("mongoose")
const schame = new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    author:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    comments:[{
        user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
        content:{type:String},
        crateTime:{type:Date},
        updateTime:{type:Date}
    }],
    supporters:[{
        user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
        time:{type:Date}
    }],
    visits:{type:Number}
},{
    timestamps:true
})

module.exports = mongoose.model('Article',schame)