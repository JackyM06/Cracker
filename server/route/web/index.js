module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams:true //合并路由参数
    })

    router.get('/page',async(req,res)=>{
        const PageSize = 20
        const current = parseInt(req.query.current)
        const data = await req.Model.find().skip(current*PageSize).limit(PageSize)
        .populate('author').populate('categories')
        res.send(data)
    })

    const resourceMiddle = require('../../middlewares/resourceMiddle')
    app.use("/web/api/v1/rest/:resource",resourceMiddle(),router)
}