<template>
    <div @click="updatedWatch()" v-if="!isSelf">
        <button v-if="isWatched" class="followedBtn py-1 px-3 fs-sm">已关注</button>
        <button v-else class="followBtn  py-1 px-3 fs-sm">关注</button>
    </div>
</template>

<script>
    export default {
        props:{
            id:String
        },
        data () {
            return {
                isWatched:true,
                isSelf : true  
            }
        },
        methods:{
            async fetchIsWatched(){
                const res = await this.$http.get(`users/nomust/followers/watched/${this.id}`)
                this.isWatched = res.data.isWatched
                this.isSelf = res.data.isSelf
            },
            async updatedWatch(){
                const res = await this.$http.put('users/followers',{
                    id:this.id,
                    isWatched:this.isWatched
                }) 
                this.isWatched = res.data.isWatched
            }
        },
        created(){
            this.fetchIsWatched()
        }
    }
</script>

<style lang="scss" scoped>

</style>