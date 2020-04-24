<template>
    <div class="text-center col-6 col-md-3">
        <div class="p-3 mb-3">
            <img @click="$router.push(`/tag/${category._id}`)"
             class="icon  cursor-point" :src="category.img || 'https://lc-gold-cdn.xitu.io/f7a198f1e1aeb6d79878.png'" alt="">
            <div class="text-gray-sl fs-sm">
                <span @click="$router.push(`/tag/${category._id}`)"
                 class="font-weight cursor-point">{{category.name}}</span>
                <p class="text-gray-sl fs-sm">{{category.desc}}</p>
                <span class="text-gray-sl fs-xs">共{{category.count}}篇文章</span><br>
                <button class="btn bg-red text-white py-1 px-3 mt-2 fs-sm">关注</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            category:Object
        },
    }
</script>

<style lang="scss" scoped>
    @import 'assets/scss/_variables.scss';
    .icon{
        width: 5rem;
        height: 5rem;
    }
    .cateCard{
        border: 1px solid map-get($colors, "light-black");
    }
</style>