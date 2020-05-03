<template>
    <div class="Gurid" ref="conent">

        <gurid
          :list-name="'user'" 
          :resource-name="'users'"
          :search-name="'name'" create-date="加入日期" update-date="最近修改" 
          :column = "[
          {label:'用户ID',prop:'name',width:'300px'},
          {label:'文章数',prop:'articles_size',sort:'custom'},
          {label:'粉丝量',prop:'fans_size',sort:'custom'},
          {label:'关注数',prop:'followers_size',sort:'custom'},
          ]" 
          @gurid-change="guridChange"
        ></gurid>
        <back-top ref="backtop" target=".Gurid"></back-top>
    </div>
</template>

<script>
  import BackTop from 'components/content/BackTop/BackTop.vue'
  import Gurid from 'components/content/Gurid/Gurid.vue'
    export default {
      name:'UserList',
      data() {
      return {

      }
    },
    components:{
      BackTop,
      Gurid
    },
    methods: {
      guridChange(){
        this.$refs.conent.scrollTop = 0
      }
    },
    beforeRouteLeave(to, from, next){
      this.scrollTop = this.$refs.conent.scrollTop
      next()
    },
  }
</script>

<style lang="scss" scoped>
</style>