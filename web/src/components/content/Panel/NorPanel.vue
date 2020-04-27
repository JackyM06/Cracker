<template>
    <div class="activePanel">
       <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.activePanel{
    z-index: 10;
    position: absolute;
    border: 1px solid #f0f2f7;
    z-index:10;
    right:-5px;
}
</style>