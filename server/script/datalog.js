module.exports = app=>{
    const CronJob = require('cron').CronJob 
    const dayjs = require('dayjs')
    //创建定时脚本，每天0：0：0保存昨日数据
    return new CronJob('0 0 0 * * *',async function(){
        let datalog = {visits:0,comments:0,supporters:0}
        const Article = await require('../models/Article').find({createdAt:
            {'$gte':dayjs().subtract(1, 'day'),'$lt':dayjs()}}) //昨日到今日的数据
        datalog.articles =  Article.length
        Article.map(e =>{ //统计文章的访客、评论数、点赞数数据
            datalog.visits += e.visits
            datalog.comments += e.comments.length
            if(e.comments.communicates){
                datalog.comments += e.comments.communicates.length
            }
            datalog.supporters += e.supporters.length
        })
        const categories_visits = await require('../models/Category').aggregate([
            {
                $lookup:{
                    from:'articles',
                    localField:'_id',
                    foreignField:'categories',
                    as:'visits'
                }
            },
            {
                $addFields:{
                    visits:{$sum:['$visits.visits']}
                }
            },
            {$sort:{visits:-1}},
        ])
        datalog.categories = categories_visits
        console.log(datalog)
        await require('../models/DataLog').insertMany(datalog)
        console.log(require('dayjs')().format('MM-DD hh:mm:ss')+"前日日志已已保存完成")
    },null, true)
}