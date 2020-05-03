<template>
    <div class="dataCard box-s d-flex flex-column jc-between p-1">
        <div></div>
        <h1>{{number}}</h1>
        <p class="fs-sm">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
            number:Number
        }
    }
</script>

<style lang="scss" scoped>
    .dataCard{
        width: 16vw;
        height: 10vw;
        border-radius: 4px;
        color: white;
        h1{
            text-align: center;
            opacity: .9;
        }
        p{
            text-align: right;
            opacity: .9;
        }
    }
</style>