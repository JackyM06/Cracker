<template>
  <div class="Gurid" ref="conent">
    <el-button type="info" @click="dialogVisible=true" plain icon="el-icon-plus" class="addButton"></el-button>
    <el-table 
    :data="model" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="一级分类" size="mini" style="width:100%">
            <el-select v-model="props.row.parent" filterable>
              <el-option
                v-for="item in categories" v-show="item._id!=props.row._id"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" size="mini" style="width:100%">
            <el-input v-model="props.row.name"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" size="mini" style="width:100%">
            <el-input v-model="props.row.desc"></el-input>
          </el-form-item>
          <el-form-item label="分类LOGO" size="mini" style="width:100%">
            <img-upload @success="url=>props.row.img=url" :img-src="props.row.img"></img-upload>
          </el-form-item>
          <el-form-item style="width:100%">
              <el-button size="mini" @click="save(props.row,props.index)"  type="info">保存</el-button>
              <el-button size="mini" @click="drop(props.row._id,props.$index)" type="danger">删除</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="_id">
    </el-table-column>
    <el-table-column
      label="分类名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="浏览人数"
      prop="visits">
    </el-table-column>
    </el-table>
    <el-pagination
    class="d-flex jc-center pt-1" 
    background
    @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"  
    @current-change="fetch" :current-page="current"
    layout="sizes,prev, pager, next,jumper"
    :page-count="total">
    </el-pagination>
    <back-top ref="backtop" target=".Gurid"></back-top>
    <el-dialog
      title="增加分类"
      :visible.sync="dialogVisible"
      width="30%">
        <el-form inline>
          <el-form-item label="一级分类" size="mini" style="width:100%">
            <el-select v-model="newCategory.parent" filterable>
              <el-option
                v-for="item in model"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" size="mini" style="width:100%">
            <el-input v-model="newCategory.name"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" size="mini" style="width:100%">
            <el-input v-model="newCategory.desc"></el-input>
          </el-form-item>
          <el-form-item label="分类LOGO" size="mini" style="width:100%">
            <img-upload @success="url=>$set(newCategory,'img',url)" :img-src="newCategory.img"></img-upload>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain  @click="dialogVisible = false;$message.warning(`已取消`)">取 消</el-button>
        <el-button type="info" @click="saveNewCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import ImgUpload from 'components/content/ImgUpload/ImgUpload.vue'
    import BackTop from 'components/content/BackTop/BackTop.vue'
    export default {
        data () {
            return {
                categories:[],
                current:1,
                pageSize:20,
                total:0,
                model:[],
                search:"",
                sort:{},
                dialogVisible:false,
                newCategory:{}
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
                query:{name:this.search},
                sort:{}
              }
            }
          }
        },
        methods:{
            async fetch(index){
                this.current = index || this.current
                const res = await this.$http.get('rest/categories/page',this.params)
                this.model = res.data.list
                this.total = res.data.page.total
                this.$refs.conent.scrollTop = 0
            },
            async save(category){
                const res = await this.$http.put(`rest/categories/${category._id}`,category)
                if(res.data){
                    this.fetchCategories()
                    this.$message.success('保存成功')
                }else{
                    this.$message.error('保存失败')
                }
            },
            async drop(id,index){
                const res = await this.$http.delete(`rest/categories/${id}`)
                if(res.data.success){
                    this.fetchCategories()
                    this.model.splice(index,1)
                    this.$message.success('删除成功')
                }else{
                    this.$message.error('删除失败')
                }
            },
            handleSizeChange(size){
              this.pageSize = size
              this.fetch()
            },
            async saveNewCate(){
              const res = await this.$http.post('rest/categories',this.newCategory)
              if(res.data){
                this.$message.success("增加完成")
                this.dialogVisible = false
                this.newCategory = {}
              }
            },
            async fetchCategories(){
                const cate = await this.$http.get('rest/categories')
                this.categories = cate.data
            }
      
        },
        created(){
            this.fetch()
            this.fetchCategories()
        },
        components:{
            ImgUpload,
            BackTop
        }
    }
</script>

<style lang="scss" scoped>
.el-table::before{
    z-index: 0;
    opacity: 0;
}
.addButton{
  position: fixed;
  bottom: 90px;
  right: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>