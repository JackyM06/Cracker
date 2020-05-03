const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    name:{type:String},
    desc:{type:String},
    img:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

module.exports = mongoose.model("Category",sechma)