const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Article = require('../../models/Article')
const User = require('../../models/User')

router.get('/init',async(req,res)=>{
    const data = await User.updateMany({},{link:{}})
    res.send(data)
})

router.get('/drafts/page',async(req,res)=>{
    const current = req.query.current || 0
    const pageSize = 20
    const data = await Article.find({author:req.user._id,type:'private'})
    .sort({updatedAt:-1}).skip(current*pageSize).limit(pageSize)
    res.send(data)
})

router.get("/:id",async(req,res)=>{
    const data = await Article.findById(req.params.id)
    .where({author:req.user._id})
    .select('+content').populate("categories")
    res.send(data)
})

router.post("/new",async(req,res)=>{
    const body = {author:req.user._id,...req.body}
    const result = await Article.insertMany(body)
    const result2 = await User.update({_id:req.user._id},{$push:{'articles':result._id}})
    res.send(result)
})

// 评论接口
// 新增评论
// router.put('/:id',async(req,res)=>{
//     if(req.body.comment_id){
//         await req.Model.update({_id:req.params.id,"comments._id":req.body.comment_id},
//             {
//                 $addToSet:{
//                     "comments.$.communicates":{
//                         user:'5e6c8193ee0d280fc02505c6',
//                         resp_user:req.body.resp_user,
//                         content:req.body.content
//                     }
//                 }
//             })
//     }else{
//         await req.Model.update({_id:req.params.id},{$push:{'comments':{
//             user:'5e6c8193ee0d280fc02505c6',
//             content:req.body.content
//         }}})
//     }
//     res.send(await req.Model.findOne({_id:req.params.id},{comments:1}).
//     populate('comments.user')
//     .populate('comments.communicates.user')
//     .populate('comments.communicates.resp_user'))
// })

router.put('/:id',async(req,res)=>{
    const result = await Article.updateOne({_id:req.params.id,author:req.user._id},req.body)
    res.send(result)
})

router.delete('/:id',async(req,res)=>{
    const result = await Article.deleteOne({_id:req.params.id,author:req.user._id})
    res.send(result)
})



module.exports = router