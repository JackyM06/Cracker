<template>
    <div class="activePanel">
       <svg class="icon  triangle bgTriangle"  aria-hidden="true">
            <use xlink:href="#icon-sanjiaoxing"></use>
        </svg>
       <svg class="icon  triangle" aria-hidden="true">
            <use xlink:href="#icon-sanjiaoxing"></use>
        </svg>
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
    .triangle{
        z-index: 10;
        color: white ;
        position: absolute;
        top: -11px;
        right: 38px;
        transform:rotate(180deg);
        font-size:14px
    }
    .bgTriangle{
        top: -13px;
        right: 37px;
        color: #f0f2f7;
        font-size: 16px
    }

}
</style>