<template>
    <div v-if="!id || Object.keys(model).length>4">
        <el-form label-width="80px" :model="model" @submit.native.prevent="save">
            <el-form-item label="公告分类" class="mb-1 py-0">
                <el-select v-model="model.categories" multiple filterable>
                  <el-option
                    v-for="item in categories"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="id"  label="发布者" class="my-0 py-0">
                <span class="fs-xs text-dark ">{{model.author.name}}</span>
            </el-form-item>
            <el-form-item v-if="id" label="时间" class="my-0 py-0">
                <span class="fs-xs text-dark ">发布于：{{model.createdAt | date}}</span>
                <span class="fs-xs text-dark pl-2">更新于：{{model.updatedAt | date(model.createdAt)}}</span>
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
                native-type="submit" >保存</el-button>
                <el-button type="info" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
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
                model:{title:"请输入公告标题",content:"输入公告内容",categories:[]},
                isFull:false,
                NoUpdate:true
            }
        },
        methods:{
            async fetchNotice(){
                const res = await this.$http.get(`rest/notices/${this.id}`)
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
                this.$confirm(this.id?'是否整改该文章?':'是否新建公告？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then( async () => {
                    let res=null
                  if(this.id){
                      res = await this.$http.put(`rest/notices/${this.id}`,this.model)
                  }else{
                      res = await this.$http.post('rest/notices',{author:"5e6c8193ee0d280fc02505c5",...this.model})
                  }
                  if(res.data){
                    if(this.id){
                        this.fetchNotice()
                        this.$notify({
                        title: '保存完成',
                        })
                    }else{
                        this.$router.go(-1)
                    }
                    
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
                this.$refs.mavon.$img2Url(pos,res.data.url)
            },
            async fetchCats(){
                const res = await this.$http.get('rest/categories')
                this.categories = res.data
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
            if(this.id){
                this.fetchNotice()
            }
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