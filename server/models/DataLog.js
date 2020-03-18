const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    visits:{type:Number,default:0},
    articles:{type:Number,default:0},
    comments:{type:Number,default:0},
    supporters:{type:Number,default:0},
    categoris_visits:[
        {
            name:{type:String},
            visits:{type:Number,default:0}
        }
    ]  
},{
    timestamps:true
})
module.exports = mongoose.model('DataLog',schema)