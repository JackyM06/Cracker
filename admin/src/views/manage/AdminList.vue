<template>
  <div class="Gurid" ref="conent">
    <el-button type="info" @click="dialogVisible=true" plain icon="el-icon-plus" class="addButton"></el-button>
    <el-table 
    :data="model" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="管理等级" size="mini" style="width:100%">
            <el-select v-model="props.row.level" filterable>
              <el-option
                v-for="item in AdminLevels" v-show="item._id!=props.row.level"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人姓名" size="mini" style="width:100%">
            <el-input v-model="props.row.name" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="个人描述" size="mini" style="width:100%">
            <el-input v-model="props.row.desc" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="手机号码" size="mini" style="width:100%">
            <el-input v-model="props.row.teleNumber" ></el-input>
          </el-form-item>
          <el-form-item label="登录密码" size="mini" style="width:100%">
            <el-input v-model="props.row.password" show-password placeholder="重置密码"></el-input>
          </el-form-item>
          <el-form-item label="个人照片" size="mini" style="width:100%">
            <img-upload @success="url=>$set(props.row,'avatar',url)" :img-src="props.row.avatar"></img-upload>
          </el-form-item>
          <el-form-item style="width:100%">
              <el-button size="mini" @click="save(props.row,props.index)"  type="info">保存</el-button>
              <el-button size="mini" @click="drop(props.row._id,props.$index)" type="danger">删除</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="个人姓名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="手机号码"
      prop="teleNumber">
    </el-table-column>
    <el-table-column
      label="个人描述"
      prop="desc">
    </el-table-column>
    <el-table-column label="管理等级" prop="level">
        <template slot-scope="props">
            <span v-if="props.row.level">{{props.row.level.name}}</span>
            <span v-else>暂无等级</span>
        </template>
    </el-table-column>
    <el-table-column label="个人照片" prop="avatar">
        <template slot-scope="props">
            <img :src="props.row.avatar" class="avatar" alt="">
        </template>
    </el-table-column>
     <el-table-column fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input :slot="scope" v-model="search"
          @keyup.enter.native = "fetch(1)" clearable
           size="mini" placeholder="搜索"/>
        </template>
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
      title="增加管理员"
      :visible.sync="dialogVisible"
      width="30%">
        <el-form inline>
          <el-form-item label="管理等级" size="mini" style="width:100%">
            <el-select v-model="newAdmin.level" filterable>
              <el-option
                v-for="item in AdminLevels"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人姓名" size="mini" style="width:100%">
            <el-input v-model="newAdmin.name" maxlength="6" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="个人描述" size="mini" style="width:100%">
            <el-input v-model="newAdmin.desc" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="手机号码" size="mini" style="width:100%">
            <el-input v-model="newAdmin.teleNumber"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" size="mini" style="width:100%">
            <el-input v-model="newAdmin.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="个人照片" size="mini" style="width:100%">
            <img-upload @success="url=>$set(newAdmin,'avatar',url)" :img-src="newAdmin.avatar"></img-upload>
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
                AdminLevels:[],
                current:1,
                pageSize:20,
                total:0,
                model:[],
                search:"",
                sort:{},
                dialogVisible:false,
                newAdmin:{}
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
                const res = await this.$http.get('rest/admins/page',this.params)
                this.model = res.data.list
                this.total = res.data.page.total
                this.$refs.conent.scrollTop = 0
            },
            async save(admin){
                const res = await this.$http.put(`rest/admins/${admin._id}`,admin)
                if(res.data){
                    this.$message.success('保存成功')
                    this.fetch()
                }else{
                    this.$message.error('保存失败')
                }
            },
            async drop(id,index){
                const res = await this.$http.delete(`rest/admins/${id}`)
                if(res.data.success){
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
              const res = await this.$http.post('rest/admins',this.newAdmin)
              if(res.data){
                this.$message.success("增加完成")
                this.dialogVisible = false
                this.newAdmin = {}
                this.fetch()
              }
            },
            async fetchAdminLevels(){
                const res = await this.$http.get('rest/admin_levels')
                this.AdminLevels = res.data
            }
      
        },
        created(){
            this.fetch()
            this.fetchAdminLevels()
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
.avatar{
    width: 30px;
    height: 30px;
}
</style>