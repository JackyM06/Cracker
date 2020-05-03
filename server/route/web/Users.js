const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
// const Article = require('../../models/Article')
const User = require('../../models/User')
const assert = require('http-assert')

router.get('/init',async(req,res)=>{
    await User.update({_id:'5e6c8193ee0d280fc02505c6'},{password:'123.123.'})
    res.send("ok")
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
// 获取用户信息接口
router.get('/info',async(req,res)=>{
    const data = await User.findById(req.user._id).populate('categories')
    res.send(data)
})
// 资料修改接口
router.put('/field',async(req,res)=>{
    const data = await User.update({_id:req.user._id},req.body)
    res.send(data)
})
// 密码重置接口
router.put('/restpassword',async(req,res)=>{
    // 验证原密码
    const user = await User.findOne({_id:req.body.user_id}).select('+password')
    const isValid = require('bcryptjs').compareSync(req.body.oldPassword,user.password)
    assert(isValid,422,"密码错误")
    // 检查新密码
    const newPassword = req.body.newPassword
    assert(newPassword.length>=6,422,"密码至少为6位")
    const data = await User.updateOne({_id:user._id},{password:newPassword})
    res.send({message:'修改完成'})
})

module.exports = router