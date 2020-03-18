<template>
    <div>
        <div class="d-flex jc-between">
            <data-card class="bg-carrot" title="昨日用户访问量" :number="model.visits"></data-card>
            <data-card class="bg-nephtitis" title="今日文章发布数" :number="model.articles"></data-card>
            <data-card class="bg-pomeg" title="今日评论数" :number="model.comments"></data-card>
            <data-card class="bg-wet" title="今日点赞数" :number="model.supporters"></data-card>
        </div>
        <div class="d-flex gruid jc-between pt-4">
             <echart-line class="echart-line" :Cats="Data" title="近7日用户互动类型分布" :xData="xData"></echart-line>
             <echart-pie  class="echart-pie" :Cats="Cats" title="分类访问占比TOP10"></echart-pie>
        </div>
    </div>
</template>

<script>
    import dataCard from './childCmps/dataCard.vue'

    import echartPie from 'components/content/Echarts/echartPie.vue'
    import echartLine from 'components/content/Echarts/echartLine.vue'

    export default {
        data(){
            return {
                Cats:[],
                Data:[],
                xData:[],
                model:{}
            }
        },
        components:{
            dataCard,
            echartPie,
            echartLine
        },
        methods:{
            async fetch(){
                const res = await this.$http.get('data')
                this.model = res.data
                this.$set(this,'Cats',res.data.categories.map(e=>({value:e.visits,name:e.name})))
            }
        },
        mounted(){
            this.fetch()
        },
        created(){

            this.Data =  [
                {
                    name: '用户访问量',
                    data: [1120, 1132, 801, 734, 990, 630, 1210]
                },
                {
                    name: '当日文章发布数',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '当日评论数',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '当日点赞数',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
            ]
            this.xData = ['03/06','03/07','03/08','03/09','03/10','03/11','03/12']
            this.fetch()
        }
    }
</script>

<style lang="scss" scoped>
.gruid{
    height: 400px;
    overflow: hidden;
}
.echart-line{
    width: 60%;
}
.echart-pie{
    width: 50%;
}
</style>