<template>
    <div class="mb-2">
        <h6 v-if="title" class="border-b px-3 py-2 m-0 font-weight text-grey">{{title}}</h6>
        <div class="px-3 py-2">
            <slot name="body"></slot>
        </div>
        <div>
            <slot name="foot"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:String
        }
    }
</script>

<style lang="scss" scoped>

</style>