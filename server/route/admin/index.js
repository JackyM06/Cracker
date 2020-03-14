module.exports = app=>{
    const express = require('express')
    const router =  express.Router()
    const Article = require('../../models/Article')
    const User = require('../../models/User')
    // router.get('/init',async(req,res)=>{
    //     await req.Model.deleteMany({})
    //     const data
    //     await req.Model.insertMany(data)
    //     res.send("ok")
    // })
    /**
     * 模型分页查询
     */
    router.get('/page',async(req,res)=>{
        let {current,pageSize,sort,query} = req.query
        pageSize= Math.min(pageSize,40)
        sort = JSON.parse(sort)
        query = JSON.parse(query)
        
        for(e in query){ query[e] = new RegExp(query[e],'i')}

        const total = Math.ceil(await req.Model.find().count(query)/pageSize)

        const list = await req.Model.find().where(query)
        .sort(sort).skip(pageSize*(current-1))
        .populate('author').limit(pageSize).lean()
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
        const data = await req.Model.findById(req.params.id).populate('author')
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

    const resourceMiddle = require('../../middlewares/resourceMiddle')
    app.use("/admin/api/v1/rest/:resource",resourceMiddle(),router)

    /**
     * 文件上传处理
     */
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../../uploads' })
    app.post('/admin/api/v1/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}