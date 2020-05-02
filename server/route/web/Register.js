module.exports = (app)=>{
    return ()=>{
        const express = require('express')
        const assert = require('http-assert')
        const jwt = require("jsonwebtoken")
        const User = require('../../models/User')
        const router = express.Router(express.Router())
            
        router.post('/new',async (req,res)=>{
            const {e_mail,name,password} = req.body
            assert(e_mail && password && name,422,"请正确填写邮箱或密码及用户名")
            // 查找用户
            req.user = await User.findOne({e_mail})
            assert(!req.user,422,"该邮箱已绑定！")
            req.user = await User.findOne({name})
            assert(!req.user,422,"该用户名已存在！")
            //插入新用户
            req.user = await User.insertMany({e_mail,name,password})
            req.user = req.user[0]
            // 返回Token
            console.log(req.user)
            const token = jwt.sign({id:req.user._id},app.get('secret'))
            return res.send({token})
        
        })
        // 邮箱验证码验证！
        
        
        
        return router
    }
}