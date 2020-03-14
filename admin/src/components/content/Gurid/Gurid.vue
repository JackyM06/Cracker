<template>
    <div>
        <el-table
        :data="model" @sort-change="sortChange" 
        stripe 
        style="width: 100%">
            <el-table-column label="序号" type="index" :index="(current-1)*pageSize+1" width="50px" style-name="text-align:center"></el-table-column>
            <el-table-column label="文章标题" prop="title" width="400px">
              <template slot-scope="scope" v-show="false">
                <span :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable="custom"  label="访问量" width="100px"  prop="visits"></el-table-column>
            <el-table-column label="作者" prop="author">
              <template slot-scope="scope">
                <span :slot="scope" style="width:100%" class="text-ellipsis">{{scope.row.author.name}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable="custom" label="创建日期" prop="createdAt" width="120px"></el-table-column>
            <el-table-column sortable="custom" label="最新修改" prop="updatedAt" width="120px"></el-table-column>
            <el-table-column align="right" fixed="right"  width="150px">
              <template slot="header" slot-scope="scope">
                <el-input :name="scope" v-model="search" size="mini" placeholder="输入关键字搜索"/>
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
    </div>
</template>

<script>
    export default {
        props:{
            modelName:{type:String,required:true},
        },
        data(){
            return {
                model:[],
                current:1,
                pageSize:3,
                total:0,
                search:"",
                sort:{},
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
        methods:{
            async handleDelete(index,id) {
              this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( async () => {
                const res = await this.$http.delete(`${this.modelName}/${id}`)
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
            async fetchList(index){
                this.current = index || this.current
                const res = 
                await this.$http.get(`${this.modelName}/page`,this.params)
                this.model = res.data.list
                this.total = res.data.page.total
                if(this.$refs.conent) this.$refs.conent.scrollTop = 0
            },
            handleSizeChange(size){
              this.pageSize = size
              this.fetchList()
            },
            sortChange({prop,order}){ 
              if(order == null){
                this.sort = {}
              }else if(order.match(new RegExp('asc'))){
                this.sort = {[prop]:1}
              }else if(order.match(new RegExp('desc'))){
                this.sort = {[prop]:-1}
              }
              this.fetchList()
            }                    
        },
        created(){
            this.fetchList()
        }
    }
</script>

<style lang="scss" scoped>

</style>