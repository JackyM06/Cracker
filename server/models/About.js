const mongoose = require("mongoose")
const schame = new mongoose.Schema({
    title:{type:String},
    content:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('About',schame,'abouts')