<template>
    <div class="articleGurid" ref="conent">
        <el-table
        :data="model"
        stripe
        style="width: 100%">
            <el-table-column label="序号" type="index" :index="(current-1)*pageSize+1" width="80px" style-name="text-align:center"></el-table-column>
            <el-table-column label="用户id" prop="title" width="200px">
              <template slot-scope="scope">
                <span :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column label="粉丝量" prop="visits"></el-table-column>
            <el-table-column label="文章数" prop="address"></el-table-column>
            <el-table-column label="评论数" prop="address"></el-table-column>
            <el-table-column label="加入日期" prop="createdAt" width="120px"></el-table-column>
            <el-table-column align="right" fixed="right"  width="150px">
              <template slot="header" slot-scope="scope">
                <el-input :slot="scope" v-model="search" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">封号</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-pagination
        class="d-flex jc-center pt-1"
        background
        @current-change="fetchArticleList"
        layout="prev, pager, next"
        :page-count="total">
        </el-pagination>
        <back-top ref="backtop" target=".articleGurid"></back-top>
    </div>
</template>

<script>
  import BackTop from 'components/content/BackTop/BackTop.vue'
  import dayjs from 'dayjs'
    export default {
      data() {
      return {
        current:0,
        pageSize:0,
        total:0,
        model:[],
        search:""
      }
    },
    components:{
      BackTop
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async fetchArticleList(index){
        const res = await this.$http.get(`userlist/${index}`)
        res.data.list.map(e => {
            e.createdAt = dayjs(e.createdAt).format('YY/MM/DD HH:mm')
        })
        this.model = res.data.list
        this.current = res.data.page.current
        this.total = res.data.page.total
        this.pageSize = res.data.page.pageSize
        if(this.$refs.conent) console.log(this.$refs.conent.scrollTop = 0)
      }
    },
    created(){
      this.fetchArticleList(1)
    }
  }
</script>

<style lang="scss" scoped>
  .search{
    border-radius: 4px;
    border: 1px solid #f1f1f1;
    height: 30px;
  }
</style>