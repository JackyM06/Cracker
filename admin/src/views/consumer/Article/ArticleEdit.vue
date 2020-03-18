<template>
    <div v-if="Object.keys(model).length>0">
        <el-tabs tab-position="right">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-order"></i>文章管理</span>
                <el-form label-width="80px" :model="model" @submit.native.prevent="save">
                    <el-form-item label="文章分类" class="mb-0 py-0">
                        <el-select v-model="model.categories" multiple filterable>
                          <el-option
                            v-for="item in categories"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作者" class="my-0 py-0">
                        <span class="fs-xs text-dark el-icon-tickets" style="cursor:pointer"
                        @click="$router.push(`/main/user/${model.author._id}`)"
                        >{{model.author.name}}</span>
                    </el-form-item>
                    <el-form-item label="时间" class="my-0 py-0">
                        <span class="fs-xs text-dark el-icon-edit-outline">发布于：{{model.createdAt | date}}</span>
                        <span class="fs-xs text-dark pl-2 el-icon-refresh-left">更新于：{{model.updatedAt | date(model.createdAt)}}</span>
                        <span class="fs-xs text-dark pl-2 el-icon-view">浏览人数：{{model.visits}}</span>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <mavon-editor 
                        :class="[{full:isFull},{notFull:!isFull}]"
                        @save="save()"
                        @imgAdd="imgAdd"
                        ref="mavon"
                        @fullScreen="fullScreen"
                         v-model="model.content">
                        </mavon-editor>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="info" :disabled="NoUpdate" 
                        native-type="submit" >保存改动</el-button>
                        <el-button type="info" @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="el-icon-s-comment">评论管理</span>
                  <el-table
                  :data="model.comments"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="_id"
                  border
                  :tree-props="{children: 'communicates', hasChildren: 'true'}">
                  <el-table-column prop="createDate" label="日期">
                    <template slot-scope="scope">
                      <span :slot="scope">{{scope.row.createDate | date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="user" label="评论人">
                    <template slot-scope="scope">
                      <span :slot="scope" style="cursor:pointer"
                       @click="$router.push(`/main/user/${scope.row.user._id}`)">
                       {{scope.row.user.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="resp_user" label="被回复人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.resp_user" :slot="scope" style="cursor:pointer"
                       @click="$router.push(`/main/user/${scope.row.user._id}`)">
                       {{scope.row.resp_user.name}}</span>
                      <span v-else :slot="scope">{{model.author.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="content" label="内容">
                    <template slot-scope="scope">
                      <span v-if="scope.row.content.length<10" :slot="scope">{{scope.row.content}}</span>
                      <span v-else :slot="scope" style="cursor:pointer"
                      @click="dialogCache.isShow = true;dialogCache.content =scope.row.content  " 
                      >点击查看完整内容</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="assist_count" width="70px" label="点赞数"></el-table-column>
                  <el-table-column label="操作"  fixed="right" width="80px">
                    <template slot-scope="scope">
                      <el-button @click="deleteComments(scope.row)" size="mini" type="danger">移除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog :visible='dialogCache.isShow' title="评论内容" width="30vw"
        :before-close="done => {dialogCache.isShow = false;done()}"
        >
            <span>{{dialogCache.content}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCache.isShow = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:{
            id:String
        },
        data () {
            return {
                categories:[],
                model:{},
                isFull:false,
                NoUpdate:true,
                dialogCache:{isShow:false,content:""}
            }
        },
        methods:{
            async fetchArticle(){
                const res = await this.$http.get(`rest/articles/${this.id}`)
                if(res.data){
                    this.model = res.data
                    setTimeout(()=>{
                        this.NoUpdate = true
                    },100)
                }

            },
            fullScreen(status){
                this.isFull = status
            },
            async save(){
                this.$confirm('是否整改该文章?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then( async () => {
                  const res = await this.$http.put(`rest/articles/${this.id}`,this.model)
                  if(res.data){
                    this.fetchArticle()
                    this.$notify({
                        title: '整改完成',
                        message: this.$createElement('i', { style: 'color: teal'}, '根据你的管理员权限，已成功整改该文章！')
                    });
                  }else{
                    this.$message({
                      type: 'error',
                      message: '网络出错!'
                    })
                  }
                })
            },
            async imgAdd(pos, $file){
                var formdata = new FormData()
                formdata.append('file', $file)
                const res = await this.$http.post('upload',formdata)
                console.log(res)
                this.$refs.mavon.$img2Url(pos,res.data.url)
            },
            async fetchCats(){
                const res = await this.$http.get('rest/categories')
                this.categories = res.data
            },
            deleteComments(row){
                this.$confirm(`是否删除该评论${!row.resp_user?'及该评论下的所有回复':""}?`, '警告', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async () => {
                    this.model.comments.map((comment,index)=>{
                        if( comment._id == row._id){
                            this.model.comments.splice(index,1)
                        }
                        if(row.resp_user){
                            comment.communicates.map((communicate,eIndex)=>{
                                if(communicate._id == row._id){
                                    this.model.comments[index].communicates.splice(eIndex,1)
                                }
                            })
                        }
                    })
                    const res = await this.$http.put(`rest/articles/${this.id}`,this.model)
                    if(res) this.$message.success('删除成功!')
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            }
        },
        watch:{
            model:{ //侦听数据变化用户判断是否启用提交按钮
                deep:true,
                handler(New,old){
                    if(Object.keys(old).length>0){ //判断是否非初始化时数据变化
                        console.log(New,old)
                        this.NoUpdate = false
                    }
                }
            }
        },
        created(){
            this.fetchArticle()
            this.fetchCats()
        }
    }
</script>

<style lang="scss" scoped>
    .full{
        height: 100vh;
    }
    .notFull{
        height: 51vh;
    }
</style>