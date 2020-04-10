module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams:true //合并路由参数
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

    const resourceMiddle = require('../../middlewares/resourceMiddle')
    app.use("/web/api/v1/rest/:resource",resourceMiddle(),router)
}