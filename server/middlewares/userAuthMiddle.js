module.exports = app=>{
    const jwt = require("jsonwebtoken")
    const assert = require('http-assert')

    return async(req,res,next)=>{
        const token = String(req.headers.authorization || " ").split(" ").pop()
        assert(token,401,"请先登录！")
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,"非法登录！请重新登录！")
        req.user = await require('../models/User').findById(id)
        assert(req.user,401,"非法登录！请重新登录！")
        next()
    }
}