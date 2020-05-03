module.exports = (app)=>{
    return ()=>{
        const express = require('express')
        const assert = require('http-assert')
        const jwt = require("jsonwebtoken")
        const User = require('../../models/User')
        const Code = require('../../models/Code')
        const router = express.Router(express.Router())
            
        router.post('/new',async (req,res)=>{
            const {e_mail,veri_code,name,password} = req.body
            assert(e_mail && password && name && veri_code,422,"请正确填写邮箱或密码及用户名")
            // 查找用户
            req.user = await User.findOne({e_mail})
            assert(!req.user,422,"该邮箱已绑定！")
            req.user = await User.findOne({name})
            assert(!req.user,422,"该用户名已存在！")
            // 验证码验证
            const vire = await Code.findOne({e_mail,veri_code})
            assert(vire,422,'验证码出错')
            //插入新用户
            assert(password.length>=6,422,'密码至少6位')
            req.user = await User.insertMany({e_mail,name,password})
            req.user = req.user[0]
            // 返回Token
            const token = jwt.sign({id:req.user._id},app.get('secret'))
            return res.send({token})
        
        })
        // 邮箱验证码验证！
        router.post('/vericode',require("../../middlewares/emailVeri")(),async(req,res)=>{
            res.send({message:"验证码已成功发送"})
        })
        
        
        return router
    }
}