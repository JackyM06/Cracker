<template>
    <div class="HomeCmps container">
        <div class="row mt-2">
            <div class="col-12 col-lg-9 px-0 mb-2">
                <div class="box-s bg-white">
                    <article-item 
                    v-for="(item,key) in info.list" :key="key"
                    :article-info="item"></article-item>
                    <load-more @click.native="fetchArticleList()" 
                    v-if="info.more"></load-more>
                    <under-line v-else></under-line>
                </div>
            </div>
            <div class="Right col-12 col-lg-3 p-0 pl-lg-2">
                <card 
                v-if="users.list.length>0"
                class="bg-white box-s" title="相关用户">
                    <div class="d-flex flex-wrap flex-1" slot="body">
                        <user-item :user="item"
                        v-for="(item,key) in users.list" :key="key" ></user-item>
                    </div>
                    <load-more slot="foot" @click.native="fetchUsersList()" 
                    v-if="users.more"></load-more>
                    <under-line  slot="foot" v-else></under-line>
                </card>
                <card
                v-if="categories.list.length>0"
                class="bg-white box-s rightCmps" title="相关分类">
                    <div slot="body">
                        <cate-item :category="item" 
                        v-for="(item,key) in categories.list" :key="key"></cate-item>
                    </div>
                    <load-more slot="foot" @click.native="fetchCategoriesList()" 
                    v-if="categories.more"></load-more>
                    <under-line slot="foot" v-else></under-line>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleItem from 'components/content/ArticleItem/ArticleItem.vue'
    import UnderLine from 'components/content/UnderLine/UnderLine.vue'
    import LoadMore from '../../components/content/UnderLine/LoadMore.vue'
    import Card from 'components/content/Card/Card.vue'

    import UserItem from './childCpms/UserItem.vue'
    import CateItem from './childCpms/CateItem.vue'

    import {ArticleInfo} from 'network/module.js'



    export default {
        props:{
            searchkey:String
        },
        name:"Search",
        data(){
            return{
                ScrollTop:0,
                info:{
                    page:0,
                    list:[],
                    more:true
                },
                categories:{
                    page:0,
                    list:[],
                    more:true
                },
                users:{
                    page:0,
                    list:[],
                    more:true
                }
            }
        },
        components:{
            ArticleItem,
            UnderLine,
            LoadMore,

            UserItem,
            CateItem,

            Card
        },
        methods:{
            async fetchArticleList(){
                const res =  await this.$http.get('rest/articles/page',{
                    params:{
                        current:this.info.page++,
                        searchKey:{title:this.searchkey}
                    }
                })
                if(res.data.length<20) this.info.more=false
                this.info.list.push(...res.data.map(e=>{
                    let heightLight = `<span style='color:red'>${this.searchkey}</span>`
                    e.title = e.title.replace(this.searchkey,heightLight)
                    return new ArticleInfo(e)
                }))
            },
            async fetchCategoriesList(){
                const res =  await this.$http.get('categories/page',{
                    params:{
                        current:this.categories.page++,
                        searchKey:{name:this.searchkey}
                    }
                })
                if(res.data.length<20) this.categories.more=false
                this.categories.list.push(...res.data.map(e=>{
                    let heightLight = `<span style='color:red'>${this.searchkey}</span>`
                    e.name = e.name.replace(this.searchkey,heightLight)
                    return e
                }))
            },
            async fetchUsersList(){
                const res =  await this.$http.get('rest/users/page',{
                    params:{
                        current:this.users.page++,
                        searchKey:{name:this.searchkey}
                    }
                })
                if(res.data.length<20) this.users.more=false
                this.users.list.push(...res.data.map(e=>{
                    let heightLight = `<span style='color:red'>${this.searchkey}</span>`
                    e.name = e.name.replace(this.searchkey,heightLight)
                    return e
                }))
            },
        },
        created(){
            this.fetchArticleList()
            this.fetchCategoriesList()
            this.fetchUsersList()
        },
        
    }
</script>

<style lang="scss" scoped>
.rightCmps{
    // height: 99px;
    position: sticky;
    top: 61px;
}
</style>