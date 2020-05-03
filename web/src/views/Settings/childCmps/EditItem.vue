<template>
    <div class="d-flex align-items-center fs-sm text-grey mb-2 pb-2 border-b" style="min-height:70px">
        <span class="mr-1" style="min-width:90px">{{title}}</span>
        <div class=" flex-1">
            <slot name="body"></slot>
        </div>
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
        }
    }
</script>

<style lang="scss" scoped>

</style>