const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Article = require('../../models/Article')
const User = require('../../models/User')

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

module.exports = router