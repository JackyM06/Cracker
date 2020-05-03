<template>
    <div class="mb-2 fs-sm">
        <div v-if="title" class="px-3 py-2 text-grey border-b">
            <h6 class=" m-0 font-weight ">{{title}}</h6>
            <div class="fs-sm mt-1">
                <slot name="desc"></slot>
            </div>
        </div>
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