<template>
    <div v-if='Object.keys(Article).length>0'>
        <!-- 文章头部 -->
        <div class="d-flex align-items-center my-2 px-2">
            <div>
                <img class="avatar" :src="Article.author.avatar" alt="">
            </div>
            <div class="flex-1 mx-2">
                <h6 style="font-weight:bolder">{{Article.author.name}}</h6>
                <div class="fs-sm text-grey-light">
                    <span class="mr-2">发布于 {{Article.createdAt | date}}</span>
                    <span v-if="Article.createdAt!=Article.updatedAt" class="mr-2">更新 {{Article.updatedAt | date(Article.createdAt)}}</span>
                    <span class="mr-1">阅读</span>
                    <span>{{Article.visits}}</span>
                </div>
            </div>
            <div>
                <button  class="followBtn fs-xs text-red px-2 py-1">关注</button>
            </div>
        </div>
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
        <!-- 文章标签推荐 -->
        <div v-if="Article.categories.length>0">
            <p class="font-weight my-2 pl-2 pl-md-3">关注下面的标签，获得更多相关文章</p>
            <div class="d-flex pl-2 pl-md-3">
                <div v-for="(item,key) in Article.categories" :key="key" 
                class="pr-2 pt-1 cursor-point"
                @click="$router.push('/')"
                >
                    <img :src="item.img" style="width:20px;height:20px" alt="">
                    <span class= "text-grey-light fs-sm p-2">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            Article:Object
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
            }
        }
    }
</script>

<style lang="scss">
    .followBtn{
        border: 1px solid rgb(203, 56, 55);
        background-color: white;
        border-radius: 3px;
    }
    .followBtn:hover{
        color: white;
        background-color: rgb(203, 56, 55);
    }
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