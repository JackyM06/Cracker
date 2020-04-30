<template>
    <div>
        <div class="py-5 bg-white-gray">
            <div class="text-center ">
                <h3 class="font-weight text-gray-sl">{{category.name}}</h3>
                <span class="text-gray-sl fs-xs">{{category.count}} 篇文章</span>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class=" col-12 px-0">
                    <div class="py-3 px-2 px-md-0 d-flex align-items-center">
                        <img :src="category.img" style="width:35px;height:35px" alt="">
                        <cate-watch class="ml-3" :id="id"></cate-watch>
                        <div class="flex-1"></div>
                        <div class="text-gray-sl">
                            <span @click="ruleChange(null,0)" :class="{'text-red':current == 0}" 
                             class="mr-3 cursor-point">默认</span>
                            <span @click="ruleChange('createdAt',1)" :class="{'text-red':current == 1}"
                            class="mr-3 cursor-point">最新</span> 
                            <span @click="ruleChange('visits',2)" :class="{'text-red':current == 2}"
                            class="cursor-point">最热</span>
                        </div>
                    </div>
                    <div class="box-s bg-white">
                        <article-item 
                        v-for="(item,key) in infoList" :key="key"
                        :article-info="item"></article-item>
                        <under-line></under-line>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleItem from 'components/content/ArticleItem/ArticleItem.vue'
    import UnderLine from 'components/content/UnderLine/UnderLine.vue'
    import CateWatch from 'components/content/Watched//CateWatch.vue'
    import {ArticleInfo} from 'network/module.js'

    export default {
        props:{
            id:String
        },
        data(){
            return {
                category:{},
                infoList:[],
                page:0,
                SortRule:null,
                current:0
            }
        },
        methods:{
            ruleChange(rule,order){
                this.current = order //排序规则改变时修改对应文字颜色
                this.SortRule = rule
                this.infoList = []
                this.page = 0
                this.fetchInfoList()
            },
            async fetchCategory(){
                const res = await this.$http.get('categories/page',{
                    params:{
                        id:this.id,
                    }
                })
                this.category = res.data[0]
            },
            async fetchInfoList(){
                const res = await this.$http.get('rest/articles/page',{
                    params:{
                        current:this.page++,
                        categories:JSON.stringify([this.id]),
                        sort:this.SortRule
                    }
                })
                this.infoList.push(...res.data.map(e => new ArticleInfo(e)))
            }
        },
        components:{
            ArticleItem,
            UnderLine,
            CateWatch
        },
        created(){
            this.fetchInfoList()
            this.fetchCategory()
            window.onscroll = this.debounce(()=>{
                const SH = document.body.scrollHeight //获取当前页面总长度
                const ST = document.documentElement.scrollTop || document.body.scrollTop  //当前元素到页面顶部的距离
                const CH = document.body.clientHeight //当前浏览器可视的高度
                if(SH - Math.ceil(CH+ST) < 100){
                    this.fetchInfoList()
                }
            },300)
        }
    }
</script>

<style lang="scss" scoped>

</style>