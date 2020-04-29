<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-9 px-0">
                <head-card :user="User"></head-card>
                <div class="card-s bg-white my-2">
                    <div class="d-flex border-b text-grey justify-content-around justify-content-md-start">
                        <div v-for="(item,key) in PageList" :key="key" class="project"
                        :class="{'active':current == key}" @click="current = key">
                            {{item}}
                        </div>
                    </div>
                    <div class="p-2">
                        <article-card v-if="current == 0" :id="this.id"></article-card>
                        <category-card v-if="current == 3" :user="User"></category-card>
                    </div>
                </div>
            </div>
            <div class="d-none d-lg-block col-lg-3  pl-2 ">
                <div class="rightCmps">
                    <card title="个人成就" class="card-s bg-white mt-2">
                        <div slot="body">
                            <div>文章被阅读 </div>
                            <div>获得点赞 </div>
                        </div>
                    </card>
                    <div class="card-s bg-white p-3">
                        <div>关注了 </div>
                        <div>关注者 </div>
                    </div>
                    <div class="card-s bg-white mt-2 p-3">
                        <div>关注分类</div>
                        <div>加入于</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadCard from './childCmps/HeadCard.vue'
    import ArticleCard from './childCmps/ArticleCard.vue'
    import CategoryCard from './childCmps/CategoryCard.vue'

    import Card from 'components/content/Card/Card.vue'

    export default {
        props:{
            id:String
        },
        data () {
            return {
                User:{},
                current:0,
                PageList:['文章','关注','粉丝','分类']
            }
        },
        methods:{
            async fetchUser(){
                const res = await this.$http.get(`rest/users/${this.id}`)
                this.User = res.data
            }
        },
        components:{
            HeadCard,
            ArticleCard,
            CategoryCard,
            Card
        },
        created(){
            this.fetchUser()
        }
    }
</script>

<style lang="scss" scoped>
    .project{
        padding: .5rem 1.6rem;
        cursor: pointer;
        border-bottom: 2px solid rgba(0,0,0,0);
    }
    .project:hover{
        color: rgb(203, 56, 55);
    }
    .active{
        color: rgb(203, 56, 55);
        border-color: rgb(203, 56, 55);
    }
</style>