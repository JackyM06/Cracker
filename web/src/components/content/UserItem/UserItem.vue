<template>
    <div class="d-flex align-items-center">
        <div>
            <img class="avatar cursor-point" @click="pushProfile" :src="user.avatar" alt="">
        </div>
        <div class="flex-1 mx-2">
            <h6 style="font-weight:bolder">
                <span  class="cursor-point" @click="pushProfile">{{user.name}}</span>
            </h6>
            <slot name="more"></slot>
        </div>
        <div>
            <user-watch :id="user._id"></user-watch>
        </div>
    </div>
</template>

<script>
    import UserWatch from 'components/content/Watched/UserWatch.vue'

    export default {
        props:{
            user:Object
        },
        methods:{
            pushProfile(){
                this.$router.push(`/profile/${this.user._id}`)
            },
        },
        components:{
            UserWatch
        }
    }
</script>

<style lang="scss" scoped>

</style>