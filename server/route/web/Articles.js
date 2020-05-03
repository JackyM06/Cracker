const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Article = require('../../models/Article')
const User = require('../../models/User')
const assert = require('http-assert')

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
// 新建文章接口
router.post("/new",async(req,res)=>{
    const body = {author:req.user._id,...req.body}
    const result = await Article.insertMany(body)
    const result2 = await User.update({_id:req.user._id},{$push:{'articles':result._id}})
    res.send(result)
})

// 评论接口
router.put('/comments/:id',async(req,res)=>{
    assert(req.user,401,"请先登录！")
    if(req.body.comment_id){
        await Article.update({_id:req.params.id,"comments._id":req.body.comment_id},
            {
                $addToSet:{
                    "comments.$.communicates":{
                        user:req.user._id,
                        resp_user:req.body.resp_user,
                        content:req.body.content
                    }
                }
            })
    }else{
        await Article.update({_id:req.params.id},{$push:{'comments':{
            user:req.user._id,
            content:req.body.content
        }}})
    }
    res.send(await Article.findOne({_id:req.params.id},{comments:1}).
    populate('comments.user')
    .populate('comments.communicates.user')
    .populate('comments.communicates.resp_user'))

})
// 删除文章接口
router.delete('/:id',async(req,res)=>{
    const result = await Article.deleteOne({_id:req.params.id,author:req.user._id})
    res.send(result)
})
//点赞接口
router.put('/support/:id',async(req,res)=>{
    assert(req.user,422,'请先登录')
    let result = await Article.findOne({_id:req.params.id})
    assert(result.author.toString() != req.user._id,422,'不能给自己点赞')
    const supported = result.supporters.map(e=>e.user.toString()).includes(req.user._id)
    assert(!supported,422,"您已赞过该文章")
    result = await Article.update({_id:req.params.id},{$push:{
        'supporters':{user:req.user._id}
    }})
    res.send(result)
})

// 更新文章
router.put('/:id',async(req,res)=>{
    const result = await Article.updateOne({_id:req.params.id,author:req.user._id},req.body)
    res.send(result)
})



module.exports = router