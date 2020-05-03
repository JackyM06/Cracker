<template>
    <div v-if="Object.keys(user).length>0">
        <card title="作者成就" class="card-s bg-white">
            <div slot="body">
                <div class="d-flex mb-2 align-items-center">
                    <svg class="icon text-red-light" aria-hidden="true">
                      <use xlink:href="#icon-eye"></use>
                    </svg>
                    <span class="flex-1 pl-2">所有文章被阅读</span>
                    <span v-text="visits"></span>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <svg class="icon text-red-light" aria-hidden="true">
                      <use xlink:href="#icon-kiss-wink-heart"></use>
                    </svg>
                    <span class="flex-1 pl-2">获得所有点赞</span>
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
        updated(){
            if(this.user._id){
                this.fetchAchievement()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>