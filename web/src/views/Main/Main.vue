<template>
    <div>
        <top-bar></top-bar>
        <keep-alive include="Home">
            <router-view :key="$route.path" class="container"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import TopBar from './childCmps/TopBar/TopBar'
    export default {
        components:{
            TopBar
        }
    }
</script>

<style lang="scss" scoped>

</style>