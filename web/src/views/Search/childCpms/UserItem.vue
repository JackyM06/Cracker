<template>
    <div class="mr-1 mb-1 cursor-point" @click="$router.push(`/profile/${user._id}`)">
        <img :src="user.avatar" class="avatar">
        <div class="fs-xs text-grey-light text-center">
            <span  style="width:55px" class="text-ellipsis" v-html="user.name"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            user:Object
        }
    }
</script>

<style lang="scss" scoped>

</style>