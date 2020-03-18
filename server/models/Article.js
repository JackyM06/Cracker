const mongoose = require("mongoose")
const schame = new mongoose.Schema({
    title:{type:String},
    content:{
        type:String,
        select:false
    },
    author:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    comments:[{
        user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
        content:{type:String},
        assist_count:{type:Number,default:0},
        createDate:{type:Date},
        communicates:[{
            user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
            resp_user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
            content:{type:String},
            createDate:{type:Date},
            assist_count:{type:Number,default:0}
        }]
    }],
    supporters:[{
        user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
        time:{type:Date}
    }],
    visits:{type:Number,default:0}
},{
    timestamps:true
})

module.exports = mongoose.model('Article',schame)