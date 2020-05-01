<template>
    <div class="HomeCmps container">
        <div class="row mt-2">
            <div class="card-s bg-white col-12 col-lg-9 px-1 px-md-2">
                <article-item 
                v-for="(item,key) in infoList" :key="key"
                :article-info="item"></article-item>
            </div>
            <div class="d-none d-lg-block col-lg-3  pl-2">
                <div class="bg-white card-s p-5 mb-2">
                    <span>测试1</span>
                    <span>测试</span>
                    <span>测试</span>
                </div>
                <div class="bg-white card-s  p-5 mb-2">
                    <span>测试2</span>
                    <span>测试</span>
                    <span>测试</span>
                </div>
                <div class="bg-white rightCmps card-s p-5 mb-2">
                    <span>测试3</span>
                    <span>测试</span>
                    <span>测试</span>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleItem from 'components/content/ArticleItem/ArticleItem.vue'

    import {ArticleInfo} from 'network/module.js'
    export default {
        name:"Home",
        data(){
            return{
                page:0,
                infoList:[],
                ScrollTop:0
            }
        },
        components:{
            ArticleItem
        },
        methods:{
            async fetchArticleList(){
                const res =  await this.$http.get('rest/articles/page',{
                    params:{
                        current:this.page++,
                        sort:'updatedAt'
                    }
                })
                this.infoList.push(...res.data.map(e=>{
                    return new ArticleInfo(e)
                }))
            },
        },
        created(){
            this.fetchArticleList()
            // 防抖式到达底部后自动获取文章数据
            window.onscroll = this.debounce(()=>{
                const SH = document.body.scrollHeight //获取当前页面总长度
                const ST = document.documentElement.scrollTop || document.body.scrollTop  //当前元素到页面顶部的距离
                const CH = document.body.clientHeight //当前浏览器可视的高度
                if(SH - Math.ceil(CH+ST) < 100){
                    this.fetchArticleList()
                }
            },300)
        },
        beforeRouteLeave(to, from, next){
            this.ScrollTop =document.documentElement.scrollTop || document.body.scrollTop
            next()
        },
        activated(){
            document.documentElement.scrollTop = this.ScrollTop
            document.body.scrollTop = this.ScrollTop
        }

    }
</script>

<style lang="scss" scoped>
.rightCmps{
    // height: 99px;
    position: sticky;
    top: 61px;
}
</style>