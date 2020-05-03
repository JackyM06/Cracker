<template>
    <div>
        <top-bar></top-bar>
         <router-view :key="$route.path"></router-view>
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