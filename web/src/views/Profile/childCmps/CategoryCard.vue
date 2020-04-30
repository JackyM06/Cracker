<template>
    <div >
        <div v-if="categories.length>0">
            <div v-for="(item,key) in categories" :key="key" class="d-flex px-3 align-items-center">
                <cate-item :category="item" class="flex-1"></cate-item>
                <cate-watch :id="item._id"></cate-watch>
            </div>
        </div>
        <no-more v-else></no-more>
    </div>
</template>

<script>
    import CateItem from 'components/content/CategoryItem/CateItem.vue'
    import CateWatch from 'components/content/Watched/CateWatch.vue'
    import NoMore from 'components/content/NoMore/NoMore.vue'
    export default {
        props:{
            categories:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            CateItem,
            CateWatch,
            NoMore
        },
    }
</script>

<style lang="scss" scoped>

</style>