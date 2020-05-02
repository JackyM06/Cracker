<template>
    <div v-if="user">
        <card title="个人成就" class="card-s bg-white mt-2">
            <div slot="body">
                <div class="d-flex mb-2 align-items-center">
                    <svg class="icon text-red-light" aria-hidden="true">
                      <use xlink:href="#icon-eye"></use>
                    </svg>
                    <span class="flex-1 pl-2">文章被阅读</span>
                    <span v-text="visits"></span>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <svg class="icon text-red-light" aria-hidden="true">
                      <use xlink:href="#icon-kiss-wink-heart"></use>
                    </svg>
                    <span class="flex-1 pl-2">获得点赞</span>
                    <span v-text="supporters"></span>
                </div>
                <div class="d-flex align-items-center">
                    <svg class="icon text-red-light" aria-hidden="true">
                      <use xlink:href="#icon-chart-line"></use>
                    </svg>
                    <span class="flex-1 pl-2">文章总计</span>
                    <span v-text="articlesCount"></span>
                </div>
            </div>
        </card>
        <div class="card-s bg-white p-3 d-flex">
            <div @click="$emit('currentChange',1)"
            class="d-flex flex-column align-items-center flex-1 cursor-point">
                <span>关注了</span>
                <span class="font-weight fs-xl" v-text="user.followers.length"></span>
            </div>
            <div @click="$emit('currentChange',2)" 
            class="d-flex flex-column align-items-center flex-1 cursor-point">
                <span>关注者</span>
                <span class="font-weight fs-xl" v-text="user.fans.length"></span>
            </div>
        </div>
        <div class="card-s bg-white mt-2 p-3">
            <div @click="$emit('currentChange',3)" class="d-flex justify-content-between cursor-point  border-b pb-1 mb-1">
                <span>关注分类</span>
                <span>{{user.categories?user.categories.length:0}}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span>加入于</span>
                <span>{{user.createdAt | date(null,'YYYY年MM月DD日')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from 'components/content/Card/Card.vue'
    export default {
        props:{
            user:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        components:{
            Card
        },
        data () {
            return {
                visits:0,
                supporters:0,
                articlesCount:0
            }
        },
        methods:{
            async fetchAchievement(){
                const res = await this.$http.get(`users/nomust/achievement/${this.user._id}`)
                this.visits = res.data.visits
                this.supporters = res.data.supporters
                this.articlesCount = res.data.articlesCount
            }
        },
        mounted(){
            this.fetchAchievement()
        }
    }
</script>

<style lang="scss" scoped>

</style>