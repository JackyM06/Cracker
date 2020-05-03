const mongoose = require("mongoose")
const sechma = new mongoose.Schema({
    e_mail:{type:String},
    veri_code:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model("Code",sechma)