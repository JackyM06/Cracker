const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    name:{type:String},
})

module.exports = mongoose.model("Category",sechma)