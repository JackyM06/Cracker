<template>
    <div class="d-flex mb-2 cursor-point" @click="$router.push(`/tag/${category._id}`)">
        <img :src="category.img" style="width:50px" alt="">
        <div class="flex-1 d-flex flex-column justify-content-between p-1">
            <span class="fs-sm font-weight" v-html="category.name"></span>
            <span class="fs-xs text-grey-light">{{category.desc}}·总发布{{category.count}}篇</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            category:Object
        }
    }
</script>

<style lang="scss" scoped>

</style>