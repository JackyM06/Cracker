<template>
    <div class="articleGurid" ref="conent">
        <el-table
        :data="model" @sort-change="sortChange" 
        stripe 
        style="width: 100%">
            <el-table-column label="序号" type="index" :index="(current-1)*pageSize+1" width="50px" style-name="text-align:center"></el-table-column>
            <el-table-column label="文章标题" prop="title" width="300px">
              <template slot-scope="scope">
                <span :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column label="分类" prop="categories" width="100px">
              <template slot-scope="scope" >
                  <span v-if="scope.row.categories" :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.categories.map(e=>e.name).join(',')}}</span>
                  <span v-else>暂无分类</span>
              </template>
            </el-table-column>
            <el-table-column sortable="custom"  label="访问量" width="100px"  prop="visits"></el-table-column>
            <el-table-column v-if="!externalQuery.hasOwnProperty('author')"  label="作者" prop="author">
              <template slot-scope="scope">
                <span :slot="scope" 
                @click="$router.push(`/main/user/${scope.row.author._id}`)" 
                style="width:100%;cursor:pointer;" class="text-ellipsis">{{scope.row.author.name}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable="custom" label="创建日期" prop="createdAt" width="120px">
              <template slot-scope="scope">
                <span :slot="scope">{{scope.row.createdAt | date}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable="custom" label="更新日期" prop="updatedAt" width="120px">
              <template slot-scope="scope">
                <span :slot="scope">{{scope.row.updatedAt | date(scope.row.createdAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right"  width="150px">
              <template slot="header" slot-scope="scope">
                <el-input :slot="scope" v-model="search"
                @keyup.enter.native = "fetchList(1)"
                 size="mini" placeholder="搜索文章"/>
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
        :page-size="pageSize"  
        @current-change="fetchList" :current-page="current"
        layout="sizes,prev, pager, next,jumper"
        :page-count="total">
        </el-pagination>
        <back-top ref="backtop" target=".articleGurid"></back-top>
    </div>
</template>

<script>
  import BackTop from 'components/content/BackTop/BackTop.vue'
    export default {
      props:{
        externalQuery:{
          type:Object,
          default(){return {}}
        }
      },
      name:'ArticleList',
      data() {
      return {
        current:1,
        pageSize:20,
        total:0,
        model:[],
        search:"",
        sort:{},
        scrollTop:0,
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
            sort:this.sort,
            query:{...this.externalQuery,title:this.search}
          }
        }
      }
    },
    components:{
      BackTop,
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
          const res = await this.$http.delete(`rest/articles/${id}`)
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
      async fetchList(index){
        this.current = index || this.current
        const res = 
        await this.$http.get("rest/articles/page",this.params)
        this.model = res.data.list
        this.total = res.data.page.total
        if(index){
          this.$refs.conent.scrollTop = 0
          this.$notify({
            title: '数据加载完成',
            type: 'success',
            duration:1000,
          })
        } 
        else this.$refs.conent.scrollTop = this.scrollTop
        
      },
      /**
       * 改变分页大小，重新获取数据
       */
      handleSizeChange(size){
        this.pageSize = size
        this.fetchList()
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
        this.fetchList()
      },
    },
    created(){
      this.fetchList()
    },
    beforeRouteLeave(to, from, next){
      this.scrollTop = this.$refs.conent.scrollTop
      next()
    },
    activated(){
      this.fetchList()
    }
  }
</script>

<style lang="scss" scoped>
</style>