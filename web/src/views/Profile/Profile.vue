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
                        <article-card v-show="current == 0" :id="this.id"></article-card>
                        <follower-card v-show="current == 1" :users="User.followers"></follower-card>
                        <follower-card v-show="current == 2" :users="User.fans"></follower-card>
                        <category-card v-show="current == 3" :categories="User.categories"></category-card>
                    </div>
                </div>
            </div>
            <div class="d-none d-lg-block col-lg-3  pl-2 ">
                <right-half v-if="User" class="rightCmps" @currentChange="currentChange" 
                :user="User"></right-half>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadCard from './childCmps/HeadCard.vue'
    import ArticleCard from './childCmps/ArticleCard.vue'
    import CategoryCard from './childCmps/CategoryCard.vue'
    import FollowerCard from './childCmps/FollowerCard.vue'
    import RightHalf from './childCmps/RightHalf.vue'

    export default {
        props:{
            id:String
        },
        data () {
            return {
                User:{
                    _id:this.id,
                    fans:[],
                    followers:[]
                },
                current:0,
                PageList:['文章','关注','粉丝','分类']
            }
        },
        methods:{
            async fetchUser(){
                const res = await this.$http.get(`rest/users/${this.id}`)
                this.User = res.data
            },
            currentChange(value){
                this.current = value
            }
        },
        components:{
            HeadCard,
            ArticleCard,
            CategoryCard,
            FollowerCard,
            RightHalf,
            
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