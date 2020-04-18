module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams:true //合并路由参数
    })

    router.get('/',async(req,res)=>{
        res.send(await req.Model.find())
    })
    router.get('/page',async(req,res)=>{
        const PageSize = 20
        const Categories =req.query.categories?JSON.parse(req.query.categories):[]
        const current = parseInt(req.query.current)
        /**
         * 待解决，如果当Categories为空时万能匹配categories
         */
        const data = await req.Model.find(req.query.categories?{
            categories:{$in:Categories}
        }:null).skip(current*PageSize).limit(PageSize)
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
        console.log(req.body)
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
}