module.exports = app => {
    const express = require('express')
    const mongoose = require("mongoose")
    const jwt = require("jsonwebtoken")
    const assert = require('http-assert')

    const userAuthMiddle = require('../../middlewares/userAuthMiddle')
    const userAuthMiddleNoMust = require('../../middlewares/userAuthMiddleNoMust')
    const resourceMiddle = require('../../middlewares/resourceMiddle')

    app.use("/web/api/v1/rest/:resource",userAuthMiddleNoMust(),resourceMiddle(),require('./rest'))

    app.use("/web/api/v1/categories",require('./Categories'))

    app.use("/web/api/v1/users/nomust",userAuthMiddleNoMust(),require('./UserPublic'))
    app.use("/web/api/v1/users",userAuthMiddle(),require('./Users'))

    app.use("/web/api/v1/articles",userAuthMiddleNoMust(),require('./Articles'))

    // 图片上传
    const multer = require('multer')
    const MAO = require('multer-aliyun-oss')
    const upload = multer({
        storage: MAO({
            config: {
                region: 'oss-cn-beijing',
                accessKeyId: 'LTAI4FwZzQjt6eyvGbYjKAFR',
                accessKeySecret: 'pEo9JZgc9pQTzxuALANmb7nM6mfLp1',
                bucket: 'moba0613'
            }
        })
    })
    app.post('/web/api/v1/upload',userAuthMiddle(),upload.single('file'),async(req,res)=>{
        const file = req.file
        res.send(file)
    })

    /**
     * 登录接口
     */
    app.post('/web/api/v1/login',async (req,res)=>{
        const {e_mail,password} = req.body
        assert(e_mail && password,422,"请填写邮箱或密码")
        // 查找用户
        const User = require('../../models/User')
        req.user = await User.findOne({e_mail}).select('+password')
        assert(req.user,422,"用户不存在")
        // 检验密码
        const isValid = require('bcryptjs').compareSync(password,req.user.password)
        assert(isValid,422,"密码错误")
        // 返回Token
        const token = jwt.sign({id:req.user._id},app.get('secret'))
        return res.send({token})

    })

    /**
     * 注册接口
     */
    app.use('/web/api/v1/register',require('./Register')(app)())

    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message || '发生错误，请稍后重试！'
        })
    })
}