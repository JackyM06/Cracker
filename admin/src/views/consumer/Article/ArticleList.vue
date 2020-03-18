<template>
    <div class="articleGurid" ref="conent">
          <gurid
          :list-name="'article'" 
          :resource-name="'articles'"
          :search-name="'title'"
          :column = "[
          {label:'文章标题',prop:'title',width:'300px'},
          {label:'分类',prop:'categories'},
          {label:'访问量',prop:'visits',sort:'custom'},
          {label:'作者',prop:'author',sort:'custom'},
          ]" 
          @gurid-change="guridChange"
          ></gurid>
        <back-top ref="backtop" target=".articleGurid"></back-top>
    </div>
</template>

<script>
  import BackTop from 'components/content/BackTop/BackTop.vue'
  import Gurid from 'components/content/Gurid/Gurid.vue'
    export default {
      name:'ArticleList',
      data() {
      return {

      }
    },
    components:{
      BackTop,
      Gurid
    },
    methods:{
      guridChange(){
        this.$refs.conent.scrollTop = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>