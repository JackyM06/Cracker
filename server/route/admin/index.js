module.exports = app=>{
    const express = require('express')
    const router =  express.Router({
        mergeParams:true //合并路由参数
    })
    const assert = require('http-assert')
    const jwt = require("jsonwebtoken")
    router.get('/init',async(req,res)=>{
        // await req.Model.deleteMany({})
        // console.log(req.ModuleName)
        const data = [
            {
                title:'测试评论文章',
                content:'测试专用',
                author:'5e6c8193ee0d280fc02505c2',
                comments:[
                    {
                        user:'5e6c8193ee0d280fc02505c5',
                        content:'我是评论测试我是评论测试我是asdfasdfas评论测试我是评论测试',
                        createDate:new Date(),
                        communicates:[
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测asdfasdfasdf试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测asdfasdfasdfasdfasdf试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测asdfasdfasdf试回dfdfd复',
                                createDate:new Date()
                            },
                        ]
                    },
                    {
                        user:'5e6c8193ee0d280fc02505c5',
                        content:'我是评论测试我是评论测试我是评论dsasdfasdfasdfasdf测试我是评论测试',
                        createDate:new Date(),
                        communicates:[
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测ddddddddd试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测ddddddddd试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测ddddddddd试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测ddddddddd试回复',
                                createDate:new Date()
                            },
                        ]
                    },
                    {
                        user:'5e6c8193ee0d280fc02505c5',
                        content:'我是评论测试我是评论测试我是评asdfasdfasdf论测试我是评论测试',
                        createDate:new Date(),
                        communicates:[
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测试回复',
                                createDate:new Date()
                            },
                            {
                                user:'5e6c8193ee0d280fc02505c6',
                                resp_user:'5e6c8193ee0d280fc02505c2',
                                content:'我也是测asdfasdfasdf试回复',
                                createDate:new Date()
                            },
                        ]
                    },
                ]
            
            },
        ]
        await req.Model.insertMany(data)
        res.send("ok")
    })
    
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
        const data = await req.Model.findById(req.params.id).select("+content")
        .populate('editor').populate('author').populate('level').populate('comments.user')
        .populate('comments.communicates.user').populate('comments.communicates.resp_user')
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
     * 数据日志接口
     */
    const dayjs = require('dayjs')
    app.get('/admin/api/v1/data',authMiddle(),async(req,res)=>{
        let datalog = {visits:0,comments:0,supporters:0}
        const Article = await require('../../models/Article').find({createdAt:
            {'$gte':dayjs(dayjs().format('YYYY-MM-DD'))}}) //今日的数据
        datalog.articles =  Article.length
        Article.map(e =>{ //统计文章的访客、评论数、点赞数数据
            datalog.visits += e.visits
            datalog.comments += e.comments.length
            if(e.comments.communicates){
                datalog.comments += e.comments.communicates.length
            }
            datalog.supporters += e.supporters.length
        })
        const categories_visits = await require('../../models/Category').aggregate([
            {
                $lookup:{
                    from:'articles',
                    localField:'_id',
                    foreignField:'categories',
                    as:'visits'
                }
            },
            {
                $addFields:{
                    visits:{$sum:['$visits.visits']}
                }
            },
            {$sort:{visits:-1}},
            {$limit:10}
        ])
        datalog.History = await require('../../models/DataLog').find().sort({createAt:-1}).limit(6)
        datalog.createAt = dayjs()
        datalog.categories = categories_visits
        await
        res.send(datalog)
    })


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