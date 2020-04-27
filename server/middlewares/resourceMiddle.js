module.exports = app =>{
    return async (req,res,next)=>{
        const ModelName = require("inflection").classify(req.params.resource)
        req.ModelName = ModelName
        req.Model = require(`../models/${ModelName}`)
        next()
    }
}