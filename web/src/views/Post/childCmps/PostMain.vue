<template>
    <div v-if='Object.keys(Article).length>0'>
        <!-- 文章头部 -->
        <user-item class="my-2 px-2" :user="Article.author">
            <div slot="more" class="fs-sm text-grey-light">
                <span class="mr-2">发布于 {{Article.createdAt | date}}</span>
                <span v-if="Article.createdAt!=Article.updatedAt" class="mr-2">最近浏览 {{Article.updatedAt | date(Article.createdAt)}}</span>
                <span class="mr-1">阅读</span>
                <span class="mr-2">{{Article.visits+1}}</span>
                <span v-if="Article.canEdit" @click="pushEdit" class="text-red cursor-point mr-2">编辑</span>
                <span v-if="Article.canEdit" @click="DeleteArticle()" 
                class="text-grey-light cursor-point">删除</span>
            </div>
        </user-item>
        <!-- 文章标题 -->
        <div class="px-2 my-3 d-inline-block">
            <h2 class="font-weight d-inline-block">{{Article.title}}</h2>
        </div>
        <!-- 内容 -->
        <mavon-editor
            class="m-0 p-0 mk-content"
           :value="Article.content"
           :subfield = "prop.subfield"
           :defaultOpen = "prop.defaultOpen"
           :toolbarsFlag = "prop.toolbarsFlag"
           :editable="prop.editable"
           :scrollStyle="prop.scrollStyle"
        ></mavon-editor>
        <!-- 点赞 -->
        <div class="p-3 d-flex align-items-center">
            <p class="font-weight mr-2">{{Article.supporters.length}}人赞了该文章</p>
            <div @click="Support" class="cursor-point">
                <svg class="icon fs-xxxl text-red" aria-hidden="true">
                    <use xlink:href="#icon-zan"></use>
                </svg>
            </div>
        </div>
        <!-- 文章标签推荐 -->
        <div v-if="Article.categories && Article.categories.length>0">
            <p class="font-weight my-2 pl-2 pl-md-3">关注下面的标签，获得更多相关文章</p>
            <div class="d-flex pl-2 pl-md-3">
                <div v-for="(item,key) in Article.categories" :key="key" 
                class="pr-2 pt-1 cursor-point"
                @click="$router.push(`/tag/${item._id}`)"
                >
                    <img :src="item.img" style="width:20px;height:20px" alt="">
                    <span class= "text-grey-light fs-sm p-2">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserItem from 'components/content/UserItem/UserItem.vue'

    export default {
        props:{
            Article:Object,
        },
        computed:{
            prop () {
                let data = {
                  subfield: false,// 单双栏模式
                  defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
                  editable: false,
                  toolbarsFlag: false,
                  scrollStyle: true
                }
                return data
            },
        },
        methods:{
            pushEdit(){
                this.$router.push(`/editor/${this.Article._id}`)
            },
            async DeleteArticle(){
                this.$MessageBox.confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then( async() => {
                    const res = await this.$http.delete(`articles/${this.Article._id}`)
                    if(res.data.ok == 1){
                        this.$message.success('现已删除！')
                        this.$router.go(-1)
                    }
                })
            },
            async Support(){
                await this.$http.put(`articles/support/${this.Article._id}`)
                this.$emit('Supported')
                this.$message.success('点赞成功！')
            }
        },
        components:{
            UserItem
        }
    }
</script>

<style lang="scss">
    .mk-content{
        position: relative!important;
        z-index: 0!important;
        box-shadow: none!important;
        background: rgba(#fff,1);
    }
    .v-show-content{
        background-color: #fff!important;
        padding: 10px!important;
    }
    .rightCmps{
        // height: 99px;
        position: sticky;
        top: 61px;
    }
</style>