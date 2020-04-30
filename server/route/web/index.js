module.exports = app => {
    const express = require('express')
    const mongoose = require("mongoose")
    const router = express.Router({
        mergeParams:true //合并路由参数
    })

    router.get('/',async(req,res)=>{
        res.send(await req.Model.find())
    })
    router.get('/page',async(req,res)=>{
        const PageSize =Math.min(req.query.pageSize || 20 ,20)  
        const sort = req.query.sort
        const Categories =req.query.categories?{
            categories:{$in:JSON.parse(req.query.categories)}
        }:null //是否限定分类
        const current = parseInt(req.query.current) || 0
        const searchOrder = req.query.searchKey?JSON.parse(req.query.searchKey):null
        for (const key in searchOrder) {
            if (searchOrder.hasOwnProperty(key) && (key != 'author')) {
                searchOrder[key] = new RegExp(searchOrder[key]);   
            }
        }
        const article = req.ModelName == "Article"?{type:'public'}:null
        const data = await req.Model.find({...article,...Categories})
        .where(searchOrder)
        .sort({[sort]:-1})
        .skip(current*PageSize).limit(PageSize)
        .populate('author').populate('categories')
        res.send(data)  
    })
    
    router.get('/:id',async(req,res)=>{
        let data = await req.Model.findById(req.params.id)
        .where(req.ModelName == "Article"?{type:'public'}:null)
        .select('+content')
        .populate('author').populate('categories').populate('comments.user')
        .populate('comments.communicates.user').populate('fans').populate('followers')
        .populate('comments.communicates.resp_user').lean()
        if(req.user._id){
            if(req.user._id == data._id){
                data.canEdit = true
            }else if( data.author && data.author._id == req.user._id ){
                data.canEdit = true
            }else{
                data.canEdit = false
            }
        }else{
            data.canEdit = false
        }
        res.send(data)
    })

    // 评论接口
    // 新增评论
    router.put('/:id',async(req,res)=>{
        if(req.body.comment_id){
            await req.Model.update({_id:req.params.id,"comments._id":req.body.comment_id},
                {
                    $addToSet:{
                        "comments.$.communicates":{
                            user:'5e6c8193ee0d280fc02505c6',
                            resp_user:req.body.resp_user,
                            content:req.body.content
                        }
                    }
                })
        }else{
            await req.Model.update({_id:req.params.id},{$push:{'comments':{
                user:'5e6c8193ee0d280fc02505c6',
                content:req.body.content
            }}})
        }
        res.send(await req.Model.findOne({_id:req.params.id},{comments:1}).
        populate('comments.user')
        .populate('comments.communicates.user')
        .populate('comments.communicates.resp_user'))
    })

    const resourceMiddle = require('../../middlewares/resourceMiddle')
    app.use("/web/api/v1/rest/:resource",(req,res,next)=>{
        req.user = {_id:'5e6c8193ee0d280fc02505c6'}
        next()
    },resourceMiddle(),router)

    app.use("/web/api/v1/categories",require('./Categories'))

    app.use("/web/api/v1/articles",(req,res,next)=>{
        req.user = {_id:'5e6c8193ee0d280fc02505c6'}
        next()
    },require('./Articles'))

    app.use("/web/api/v1/users",(req,res,next)=>{
        req.user = {_id:'5e6c8193ee0d280fc02505c6'}
        next()
    },require('./Users'))

    // 图片上传
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../../uploads' })
    app.post('/web/api/v1/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}