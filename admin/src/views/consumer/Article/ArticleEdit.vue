<template>
    <div v-if="Object.keys(model).length>0">
        <el-form label-width="80px" :model="model" @submit.native.prevent="save">
            <el-form-item label="作者" class="my-0 py-0">
                <span class="fs-xs text-dark ">{{model.author.name}}</span>
            </el-form-item>
            <el-form-item label="时间" class="my-0 py-0">
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
                native-type="submit" >保存改动</el-button>
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
                model:{},
                isFull:false,
                NoUpdate:true
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