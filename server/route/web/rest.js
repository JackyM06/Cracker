const express = require('express')
const mongoose = require("mongoose")
const router = express.Router(express.Router({
    mergeParams:true //合并路由参数
}))


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
    
    if(req.user){
        
        if(req.user._id.toString() == data._id.toString()){
            data.canEdit = true
        }else if( data.author && data.author._id.toString() == req.user._id.toString() ){
            data.canEdit = true
        }else{
            data.canEdit = false
        }

        if(req.ModelName == 'Article' && data.author._id.toString() != req.user._id.toString()){
            await req.Model.updateOne({_id:data._id},{visits:data.visits+1})
        }
    }else{
        data.canEdit = false
    }

    res.send(data)
})


module.exports = router