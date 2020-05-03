module.exports = app=>{
    const jwt = require("jsonwebtoken")
    const assert = require('http-assert')

    return async(req,res,next)=>{
        req.user = null
       if(req.headers.authorization){
        const token = String(req.headers.authorization || " ").split(" ").pop()
        const {id} = jwt.verify(token,req.app.get('secret'))
        req.user = await require('../models/User').findById(id)
       }
        next()
    }
}