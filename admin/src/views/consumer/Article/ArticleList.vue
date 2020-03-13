<template>
    <div class="articleGurid" ref="conent">
        <el-table
        :data="model" @sort-change="sortChange" sortable="custom"
        stripe 
        style="width: 100%">
            <el-table-column label="序号" type="index" :index="(current-1)*pageSize+1" width="50px" style-name="text-align:center"></el-table-column>
            <el-table-column label="文章标题" prop="title" width="400px">
              <template slot-scope="scope">
                <span :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable label="访问量" width="100px" prop="visits"></el-table-column>
            <el-table-column label="作者" prop="author">
              <template slot-scope="scope">
                <span :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.author.name}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable label="创建日期" prop="createdAt" width="120px"></el-table-column>
            <el-table-column sortable label="更新日期" prop="updatedAt" width="120px"></el-table-column>
            <el-table-column align="right" fixed="right"  width="150px">
              <template slot="header" slot-scope="scope">
                <el-input :slot="scope" v-model="search" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" 
                @click="$router.push(`/main/article/${scope.row._id}`)">整改</el-button>
                <el-button size="mini" type="danger" 
                @click="handleDelete(scope.$index,scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-pagination
        class="d-flex jc-center pt-1"
        background 
        @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 40]"  
        @current-change="fetchArticleList" :current-page="current"
        layout="sizes,prev, pager, next,jumper"
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
        current:1,
        pageSize:10,
        total:0,
        model:[],
        search:"",
        sort:{}
      }
    },
    computed:{
      /**
       * 排序规则及分页信息
       */
      params(){
        return {
          params:{
            current:this.current,
            pageSize:this.pageSize,
            sort:this.sort
          }
        }
      }
    },
    components:{
      BackTop
    },
    methods: {
      /**
       * 删除文章数据
       */
      async handleDelete(index,id) {
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          const res = await this.$http.delete(`article/${id}`)
          if(res.data.success){
            this.model.splice(index,1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else{
            this.$message({
              type: 'error',
              message: '网络出错!'
            })
          }
        })
      },
      /**
       * 获取文章数据（按照约定好的分页和页序和排序规则）
       */
      async fetchArticleList(index){
        this.current = index || this.current
        const res = 
        await this.$http.get("article/page",this.params)
        res.data.list.map(e => {e.updatedAt
          e.createdAt = dayjs(e.createdAt).format('YY/MM/DD HH:mm')
          e.updatedAt = dayjs(e.updatedAt).format('YY/MM/DD HH:mm')
          if(e.createdAt == e.updatedAt) e.updatedAt = "从未更新"
        })
        this.model = res.data.list
        this.total = res.data.page.total
        if(this.$refs.conent) this.$refs.conent.scrollTop = 0
      },
      /**
       * 改变分页大小，重新获取数据
       */
      handleSizeChange(size){
        this.pageSize = size
        this.fetchArticleList()
      },
      /**
       * 排序发生改变时修改排序规则，向后端重新获取数据
       */
      sortChange({prop,order}){ 
        if(order == null){
          this.sort = {}
        }else if(order.match(new RegExp('asc'))){
          this.sort = {[prop]:1}
        }else if(order.match(new RegExp('desc'))){
          this.sort = {[prop]:-1}
        }
        this.fetchArticleList()
      }
    },
    created(){
      this.fetchArticleList()
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