<template>
    <div >
        <cate-item v-for="(item,key) in User.categories" :key="key" :category="item"></cate-item>
    </div>
</template>

<script>
    import CateItem from 'components/content/CategoryItem/CateItem.vue'
    export default {
        props:{
            User:Object
        },
        components:{
            CateItem
        },
    }
</script>

<style lang="scss" scoped>

</style>