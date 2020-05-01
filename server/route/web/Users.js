const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Article = require('../../models/Article')
const User = require('../../models/User')
//判断token携带的用户是否关注参数中的分类
router.get('/categoires/watched/:id',async(req,res)=>{
    let data
    if(req.user){
        data = await User.findById(req.user._id).lean()
        if(data.categories.map(e=>e.toString()).includes(req.params.id)){
            res.send({isWatched:true})
            return
        }
    }
    res.send({isWatched:false})
})
//判断token携带的用户是否关注参数中的用户
router.get('/followers/watched/:id',async(req,res)=>{
    let data
    let result ={isWatched:false,isSelf:false}
    if(req.user){
        data = await User.findById(req.user._id).lean()
        if(data.followers.map(e=>e.toString()).includes(req.params.id)){
            result.isWatched =true
        }
        if(req.user._id == req.params.id) result.isSelf = true
    }

    res.send(result)
})
//分类关注更新接口
router.put('/categories',async(req,res)=>{
    const ID = mongoose.Types.ObjectId(req.body.id)
    const user = await User.findById(req.user._id).lean()
    const categories = user.categories.map(e=>e.toString())
    let data

    if(!req.body.isWatched){
        if(!categories.includes(req.body.id)){
            data = await User.update({
                _id:req.user._id,
            },{
                $push:{'categories':ID}
            })
            res.send({isWatched:true})
            return
        }
    }else{
        data = await User.update({_id:req.user._id},{
            $pull:{'categories':ID}
        })
    }
    res.send({isWatched:false})
})
// 粉丝关注更新处理接口
router.put('/followers',async(req,res)=>{
    const UID = mongoose.Types.ObjectId(req.user._id)
    const CID = mongoose.Types.ObjectId(req.body.id)
    const user = await User.findById(req.user._id).lean()
    const followers = user.followers.map(e=>e.toString())
    if(!req.body.isWatched){
        if(!followers.includes(req.body.id)){
            await User.update({_id:req.user._id,},{
                $push:{'followers':CID}
            })
            await User.update({_id:req.body.id,},{
                $push:{'fans':UID}
            })
            res.send({isWatched:true})
            return
        }
    }else{
        await User.update({_id:req.user._id},{
            $pull:{'followers':CID}
        })
        await User.update({_id:req.body.id},{
            $pull:{'fans':UID}
        })
        res.send({isWatched:false})
    }
})

// 用户成就获取接口

router.get('/achievement/:id',async(req,res)=>{
    const ID = mongoose.Types.ObjectId(req.params.id)
    let Send = {visits:0,supporters:0,articlesCount:0}

    const data = await Article.aggregate([
        {
            $group:{
                _id:'$author',
                supporters:{$sum:{
                    $size:'$supporters'
                }},
                visits:{$sum:'$visits'},
                articlesCount:{$sum:1}
            }
        },{
            $match:{
                '_id':ID
            }
        }
    ])
    if(data.length>0){
        Send.supporters = data[0].supporters
        Send.visits = data[0].visits
        Send.articlesCount = data[0].articlesCount

    }
    res.send(Send)
})

router.get('/info',async(req,res)=>{
    const data = await User.findById(req.user._id)
    res.send(data)
})

router.put('/field',async(req,res)=>{
    const data = await User.update({_id:req.user._id},req.body)
    res.send(data)
})

module.exports = router