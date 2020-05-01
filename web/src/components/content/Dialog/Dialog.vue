<template>
    <div v-show="show">
        <div class="dialogBg">
          <div class="dialog card-s p-4" ref="dialog">
              <div class="d-flex mb-2">
                  <div class="flex-1">
                      <slot name="title"></slot>
                  </div>
                  <div class="cursor-point" @click="show = false">
                    <svg class="icon text-gray-sl" aria-hidden="true">
                      <use xlink:href="#icon-close"></use>
                    </svg>
                  </div>
              </div>
              <div>
                  <slot name="body"></slot>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
        
          isShow:{
            type:Boolean,
            default:false
          }
        },
        data () {
          return {
            show:this.isShow
          }
        },
        watch:{
          isShow(){
            this.show = true
          }
        }
    }
</script>

<style lang="scss" scoped>
  .dialogBg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(33,33,33,.4);
    z-index: 1000;
    .dialog{
      width: 300px;
      margin: 0 auto;
      margin-top: 30vh;
      background: #fff;
    }
  }
</style>