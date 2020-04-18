<template>
    <div class="text-center col-6 col-md-3">
        <div class="p-3 mb-3 cateCard">
            <img class="icon  cursor-point" :src="category.img || 'https://lc-gold-cdn.xitu.io/f7a198f1e1aeb6d79878.png'" alt="">
            <div class="">
                <span class="font-weight">{{category.name}}</span>
                <p>{{category.desc}}</p>
                <button>关注</button>
            </div>
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
    @import 'assets/scss/_variables.scss';
    .icon{
        width: 5rem;
        height: 5rem;
    }
    .cateCard{
        border: 1px solid map-get($colors, "light-black");
    }
</style>