const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Category = require('../../models/Category')

router.get("/page",async(req,res)=>{
    const Current = req.query.current || 0
    const PageSize = Math.min(req.query.pageSize,20) || 20 //设置页数自定义阈值
    const searchOrder = req.query.searchKey?JSON.parse(req.query.searchKey):{}
    for (const key in searchOrder) {
        if (searchOrder.hasOwnProperty(key) && key!="_id") {
            searchOrder[key] = new RegExp(searchOrder[key]);   
        }
    }
    const idOrder = req.query.id ? {_id:mongoose.Types.ObjectId(req.query.id)} : null
    const categories = await Category.aggregate([
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
            $project:{
                'name':1,
                'desc':1,
                'img':1,
                'parent':1,
                'count':{
                    $filter:{
                        input:"$count",
                        as:'item',
                        cond:{$eq:['$$item.type','public']} //筛选公开类型的文章
                    }
                }
            }
        },
        {
            $addFields:{
                count:{$size:['$count']}
            }
        }
        
    ]).skip(Current*PageSize).limit(PageSize)
    res.send(categories)
})

module.exports = router