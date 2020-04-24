<template>
    <div class="container">
        <div class="article-item row py-1 px-0 px-md-1">
            
            <div class="col-10"  :class="{'col-12':articleInfo.img==null}">
                <div class="d-flex fs-xs text-grey-light">
                    <span>{{articleInfo.message.auth}}·</span>
                    <span>{{articleInfo.message.createdAt | date}}·</span>
                    <span>{{articleInfo.message.categories}}</span>
                </div>
                <h5
                @click="clickTitle"
                class="InfoTitle cursor-point text-ellipsis my-1 w-100 InfoTitle">
                <slot></slot>
                <span v-html="articleInfo.title"></span>
                </h5>
                <div class="d-flex text-grey-light">
                    <div>
                        <svg class="icon fs-xl" aria-hidden="true">
                          <use xlink:href="#icon-zan"></use>
                        </svg>
                        <span class="ml-1 mr-3 fs-sm">{{articleInfo.likes}}人喜欢</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-pinglun"></use>
                        </svg>
                        <span class="ml-1 mr-3 fs-sm">{{articleInfo.comments}}条评论</span>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-fenxiang"></use>
                        </svg>
                        <span class="ml-1 mr-3 fs-sm">分享</span>
                    </div>
                </div>
            </div>
            <div class="info-img ai-stretch p-1 col-2"
            :style="{'background-image':`url(${articleInfo.img})`}"
             v-if="articleInfo.img!=null"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            articleInfo:{
                type:Object
            }
        },
        methods:{
            // 点击标题后改变标题颜色，并完成跳转
            clickTitle(el){
                el.target.style.color = "#909090"
                this.$router.push(`/post/${this.articleInfo.articleId}`)
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
        // background-image: url(https://pic4.zhimg.com/c4ebd58f385dee6dc0dbf4c2c91a1d62_im.jpg);
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .InfoTitle{
        font-weight: bolder;
        cursor: pointer;
    }
    .InfoTitle:hover{
        transition: 200ms;
        color: rgb(203, 56, 55);
    }
</style>