<template>
    <div v-if="Object.keys(model).length>0">
        <el-tabs type="border-card" :lazy="true" style="background:rgb(250,250,250)">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-tickets"></i>用户信息</span>
                <el-form label-width="80px" :model="model" @submit.native.prevent="save">
                    <el-form-item label="用户名称">
                        <el-input v-model="model.name" 
                        style="width:30%;min-width:200px;" maxlength="20" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="用户头像">
                        <img-upload @success="url=>model.avatar=url" :img-src="model.avatar"></img-upload>
                    </el-form-item>
                    <el-form-item label="所在公司">
                       <el-input v-model="model.company" 
                       style="width:70%;min-width:300px;" maxlength="40" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="个人简介">
                        <el-input v-model="model.introduction" type="textarea"
                      :rows="4"  style="width:40%;min-width:200px;" class="fs-xl" maxlength="120"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="info" :disabled="NoUpdate" 
                        native-type="submit" >保存改动</el-button>
                        <el-button type="info" @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-promotion"></i>作品信息</span>
                <article-list :external-query="{author:model._id}"></article-list>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-promotion"></i>粉丝查看({{model.fans_size}})</span>
                <el-table :data="model.fans">
                    <el-table-column label="用户ID" prop="_id"></el-table-column>
                    <el-table-column label="用户名" prop="name"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-flag"></i>关注用户({{model.followers_size}})</span>
                <el-table :data="model.fans">
                    <el-table-column label="用户ID" prop="_id"></el-table-column>
                    <el-table-column label="用户名" prop="name"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ArticleList from '../Article/ArticleList.vue'
    import ImgUpload from 'components/content/ImgUpload/ImgUpload.vue'
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
            async fetch(){
                const res = await this.$http.get(`rest/users/${this.id}`)
                if(res.data){
                    this.model = res.data
                    setTimeout(()=>{
                        this.NoUpdate = true
                    },0)
                }

            },
            async save(){
                this.$confirm('是否整改该文章?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then( async () => {
                  const res = await this.$http.put(`rest/users/${this.id}`,this.model)
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
            this.fetch()
        },
        components:{
            ArticleList,
            ImgUpload
        }
    }
</script>

<style lang="scss">
    .full{
        height: 100vh;
    }
    .notFull{
        height: 51vh;
    }
</style>