<template>
    <div class="">
        <div class="article-item d-flex p-2">
            <div class="flex-1">
                <div class="d-flex fs-xs text-grey-light">
                    <span>作者·</span>
                    <span>时间·</span>
                    <span>分类</span>
                </div>
                <h3 class="text-ellipsis my-1" style="width:40vw">我是标题我是标题我是标题是标题我是标题我是标题我是标题我是标题我是标题我是标是标题我是标题我是标题我是标题我是标题我是标题我是标是标题我是标题我是标题我是标题我是标题我是标题我是标我是标题我是标题我是标题我是标题</h3>
                <div class="d-flex text-grey-light">
                    <i class="">赞</i>
                    <i>评论</i>
                    <i>分享</i>
                </div>
            </div>
            <div class="info-img ai-stretch m-1">
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                articleInfo:{
                    
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .article-item{
        border-bottom: 1px solid #f0f2f7;
    }
    .info-img{
        width: 4rem;
        background-image: url(https://pic4.zhimg.com/c4ebd58f385dee6dc0dbf4c2c91a1d62_im.jpg);
        background-repeat: no-repeat;
        background-size: 100%;
    }
</style>