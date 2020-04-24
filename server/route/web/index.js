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
        const PageSize = 20
        const sort = req.query.sort
        const Categories =req.query.categories?{
            categories:{$in:JSON.parse(req.query.categories)}
        }:null //是否限定分类
        const current = parseInt(req.query.current) || 0
        const searchOrder = req.query.searchKey?JSON.parse(req.query.searchKey):null
        for (const key in searchOrder) {
            if (searchOrder.hasOwnProperty(key)) {
                searchOrder[key] = new RegExp(searchOrder[key]);   
            }
        }
        const data = await req.Model.find(Categories)
        .where(searchOrder)
        .sort({[sort]:-1})
        .skip(current*PageSize).limit(PageSize)
        .populate('author').populate('categories')
        res.send(data)  
    })
    
    router.get('/:id',async(req,res)=>{
        const data = await req.Model.findById(req.params.id).select('+content')
        .populate('author').populate('categories').populate('comments.user')
        .populate('comments.communicates.user')
        .populate('comments.communicates.resp_user')
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
    app.use("/web/api/v1/rest/:resource",resourceMiddle(),router)

    app.get("/web/api/v1/categories/page",async(req,res)=>{
        const Current = req.query.current || 0
        const PageSize = 20
        const searchOrder = req.query.searchKey?JSON.parse(req.query.searchKey):{}
        for (const key in searchOrder) {
            if (searchOrder.hasOwnProperty(key)) {
                searchOrder[key] = new RegExp(searchOrder[key]);   
            }
        }
        const idOrder = req.query.id ? {_id:mongoose.Types.ObjectId(req.query.id)} : null
        const categories = await require('../../models/Category').aggregate([
            {
                $match:{...searchOrder,...idOrder}
            },
            {
                $lookup:{
                    from:'articles',
                    localField:'_id',
                    foreignField:'categories',
                    as:'count'
                }
            },
            {
                $addFields:{
                    count:{$size:['$count']}
                }
            },
        ]).skip(Current*PageSize).limit(PageSize)
        res.send(categories)
    })
}