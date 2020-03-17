module.exports = app=>{
    const express = require('express')
    const router =  express.Router({
        mergeParams:true //合并路由参数
    })
    const assert = require('http-assert')
    const jwt = require("jsonwebtoken")
    // router.get('/init',async(req,res)=>{
    //     await req.Model.deleteMany({})
    //     // console.log(req.ModuleName)
    //     // const data = [{name:"顶级"},{name:"管理"},{name:"普通"}]
    //     await req.Model.insertMany(data)
    //     res.send("ok")
    // })
    
    router.get('/',async(req,res)=>{
        const data = await req.Model.find().lean()
        res.send(data)
    })

    /**
     * 模型分页查询
     */
    router.get('/page',async(req,res)=>{
        let {current,pageSize,sort,query} = req.query
        pageSize= Math.min(pageSize,40)
        sort = JSON.parse(sort)
        query = JSON.parse(query)
        for(e in query){if(e != 'author')query[e] = new RegExp(query[e],'i')}

        const total = Math.ceil(await req.Model.find().countDocuments(query)/pageSize)

        const list = await req.Model.find().where(query)
        .sort(sort).skip(pageSize*(current-1))
        .populate('author').populate('categories').populate('level').limit(pageSize).lean()
        const data = {list,page:{total}}
        res.send(data)
    })
    /**
     * 按id删除文档
     */
    router.delete('/:id',async(req,res)=>{
        const success = await req.Model.findByIdAndDelete(req.params.id)
        if(success){
            return res.send({success:true})
        }
        return res.send({success:false})
        
    })
    /**
     * 按id查找文档
     */
    router.get('/:id',async(req,res)=>{
        const data = await req.Model.findById(req.params.id)
        .populate('editor').populate('author').populate('level')
        res.send(data || "未查找到该项目")
    })
    /**
     * 按id更新文档
     */
    router.put('/:id',async(req,res)=>{
        const sucess = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        const data = await req.Model.findById(req.params.id).populate('author')
        res.send(data)
    })
    /**
     * 增加文档
     */
    router.post('/',async(req,res)=>{

        const data = await req.Model.create(req.body)
        res.send(data)
    })
    const authMiddle = require('../../middlewares/authMiddle')
    const resourceMiddle = require('../../middlewares/resourceMiddle')
    app.use("/admin/api/v1/rest/:resource",authMiddle(),resourceMiddle(),router)

    /**
     * 文件上传处理
     */
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../../uploads' })
    app.post('/admin/api/v1/upload',authMiddle(),upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    /**
     * 数据分析接口
     */
    // app.use('/admin/api/v1/data',authMiddle(),async(req,res)=>{

    // })


    /**
     * 登录接口
     */
    app.post('/admin/api/v1/login',async (req,res)=>{
        const {teleNumber,password} = req.body
        assert(teleNumber && password,422,"请填写手机号或密码")
        // 查找用户
        const Admin = require('../../models/Admin')
        req.user = await Admin.findOne({teleNumber}).select('+password')
        assert(req.user,422,"用户不存在")
        // 检验密码
        const isValid = require('bcryptjs').compareSync(password,req.user.password)
        assert(isValid,422,"密码错误")
        // 返回Token
        const token = jwt.sign({id:req.user._id},app.get('secret'))
        return res.send({token,admin:req.user._id})

    })

    //错误处理函数
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message || '发生错误，请稍后重试！'
        })
    })
}