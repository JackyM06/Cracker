<template>
    <div ref="articleCard">
        <div v-if="Articles.length>0">
            <article-item v-for="(item,key) in Articles" :key="key"
            :article-info="item"></article-item>
        </div>
        <no-more v-else></no-more>
    </div>
</template>

<script>
    import ArticleItem from 'components/content/ArticleItem/ArticleItem.vue'
    import NoMore from 'components/content/NoMore/NoMore.vue'

    import {ArticleInfo} from 'network/module.js'
    export default {
        props:{
            id:String
        },
        data () {
            return {
                Articles:[],
                page:0
            }
        },
        components:{
            ArticleItem,
            NoMore
        },
        methods:{
            async fetchArticleList(){
                const res =  await this.$http.get('rest/articles/page',{
                    params:{
                        current:this.page++,
                        sort:'updatedAt',
                        searchKey:{author:this.id}
                    }
                })
                this.Articles.push(...res.data.map(e=>{
                    return new ArticleInfo(e)
                }))
            },
        },
        created(){
            this.fetchArticleList()
            window.onscroll = this.debounce(()=>{
                const SH = document.body.scrollHeight //获取当前页面总长度
                const ST = document.documentElement.scrollTop || document.body.scrollTop  //当前元素到页面顶部的距离
                const CH = document.body.clientHeight //当前浏览器可视的高度
                if(SH - Math.ceil(CH+ST) < 100){
                    this.fetchArticleList()
                }
            },300)
        }
    }
</script>

<style lang="scss" scoped>

</style>