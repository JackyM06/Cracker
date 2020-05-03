<template>
    <div class="noticesGurid" ref="conent">
      <el-button type="info" @click="newNotice" 
      plain icon="el-icon-plus" class="addButton"></el-button>
      <gurid
        :list-name="'notice'" 
        :resource-name="'notices'"
        :search-name="'title'"
        :column = "[
        {label:'文章标题',prop:'title',width:'300px'},
        {label:'访问量',prop:'visits',sort:'custom'},
        {label:'分类',prop:'categories'},
        {label:'发布者',prop:'author'},
        ]" 
        @gurid-change="guridChange"
      ></gurid>
        <back-top ref="backtop" target=".noticesGurid"></back-top>
    </div>
</template>

<script>
  import BackTop from 'components/content/BackTop/BackTop.vue'
  import Gurid from 'components/content/Gurid/Gurid.vue'
    export default {
      name:'noticesList',
      data() {
      return {
      }
    },
    computed:{
    },
    components:{
      BackTop,
      Gurid
    },
    methods: {
      newNotice(){
        this.$confirm('是否新建公告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          this.$router.push(`/main/notice/create`)
          })
        },
      guridChange(){
        this.$refs.conent.scrollTop = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
.addButton{
  position: fixed;
  bottom: 90px;
  right: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>