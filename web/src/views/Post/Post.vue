<template>
    <div class="container">
        <div class="row mt-0 mt-md-2">
            <div class="col-12 col-lg-9 px-0">
                <div class="card-s bg-white  p-2 p-lg-3">
                    <post-main @Supported="fetchArticle()" class="PostMain" :article = 'Article'></post-main>
                </div>
                <!-- 评论 -->
                <div class="card-s mb-2 bg-white mt-2">
                    <h5 class="pl-3 pb-2 pt-3 font-weight" 
                    style="border-bottom: 1px solid #f0f2f7;">评论</h5>
                    <comments-main @editCom="editCom" :id="id" :comments = "Article.comments" class="px-3"></comments-main>
                </div>
                <!-- 推荐 -->
                <div v-if="RecommendList.length>0" class="card-s bg-white mt-2 p-0">
                    <h5 class="pl-3 pb-2 pt-3 font-weight" 
                    style="border-bottom: 1px solid #f0f2f7;">相关推荐</h5>
                    <article-item 
                    v-for="(item,key) in RecommendList" :key="key"
                    :article-info="item"></article-item>
                    <under-line></under-line>
                </div>
            </div>
            <div class="Right d-none d-lg-block col-lg-3  pl-2 p-0">
                <user-achievement class="rightCmps" :user="Article.author">
                </user-achievement>
            </div>
        </div>
    </div>
</template>

<script>

    import ArticleItem from 'components/content/ArticleItem/ArticleItem.vue'
    import UnderLine from 'components/content/UnderLine/UnderLine.vue'
    import UserAchievement from '../../components/content/Card/UserAchievement.vue'

    import PostMain from './childCmps/PostMain.vue'
    import CommentsMain from './childCmps/CommentsMain.vue'

    import {ArticleInfo} from 'network/module.js'



    export default {
        props:{
            id:{
                type:String
            }
        },
        data () {
            return {
                Article:{},
                RecommendList:[],
                categories:[],
                page:0
            }
        },
        methods:{
            async fetchArticle(){
                const res = await this.$http.get(`/rest/articles/${this.id}`)
                this.Article = res.data
                this.categories = res.data.categories.map(e=>e._id)
            },
            async fetchRecommend(){
                const res = await this.$http.get(`/rest/articles/page`,{
                    params:{    
                        current:this.page++,
                        categories:JSON.stringify(this.categories)
                    }
                })
                this.RecommendList.push(...res.data.map(e=>{
                    return new ArticleInfo(e)
                }))
            },
            editCom(comment){
                this.Article.comments = comment
            }
        },
        components:{
            PostMain,
            ArticleItem,
            CommentsMain,
            UnderLine,
            UserAchievement
        },
        async created(){
            await this.fetchArticle()
            this.fetchRecommend()
            window.onscroll = this.debounce(()=>{
                const SH = document.body.scrollHeight //获取当前页面总长度
                const ST = document.documentElement.scrollTop || document.body.scrollTop  //当前元素到页面顶部的距离
                const CH = document.body.clientHeight //当前浏览器可视的高度
                console.log(CH)
                if(SH - Math.ceil(CH+ST) < 100){
                    this.fetchRecommend()
                }
            },300)
        }
    }
</script>

<style lang="scss" scoped>
    .rightCmps{
        z-index: -1;
    }
</style>