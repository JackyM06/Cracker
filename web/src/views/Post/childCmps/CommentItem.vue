<template>
    <div class="d-flex px-1 py-2">
        <img :src="comment.user.avatar" style="width:40px;height:40px" class="avatar mr-1 mr-md-2" alt="">
        <div class="flex-1 fs-sm">
            <span>{{comment.user.name}}</span>
            <p class="my-2">
                <span v-if="comment.resp_user">回复 <span class="cursor-point text-blue-black">{{comment.resp_user.name}}</span>:</span>
                {{comment.content}}</p>
            <div class="text-grey-light d-flex mb-2">
                <span class="text-grey-light flex-1">{{comment.createDate | date(comment.createDate+1)}}</span>
                <div class="mr-lg-5 mr-3">
                    <svg class="icon cursor-point btnHover" aria-hidden="true">
                        <use xlink:href="#icon-zan1"></use>
                    </svg>
                    <span v-show="comment.assist_count>0" class="pl-1">{{comment.assist_count}}</span>
                </div>
                <div class="cursor-point btnHover" @click="isShow = !isShow">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huifu1"></use>
                    </svg>
                    <span class="pl-2">回复</span>
                </div>
            </div>
            <!-- 回复框 -->
            <comment-input 
            @blur="isShow = false"
            @commit = "commitCom"
            v-show="isShow" :user="comment.user.name" :id="comment._id"></comment-input>
            <!--  回复插槽  -->
            <slot></slot> 
        </div> 
    </div>
</template>

<script>
    import CommentInput from 'components/content/CommentInput/CommentInput.vue'

    export default {
        props:{
            comment:Object,
            id:String,
            commentId:String
        },
        components:{
            CommentInput
        },
        data () {
            return {
                isShow:false
            }
        },
        methods:{
            async commitCom(content){
                this.isShow = false
                this.$emit("commitCom",{
                    comment_id:this.commentId,
                    resp_user:this.comment.user._id,
                    content
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btnHover:hover{
        transition: 200ms;
        opacity: 0.7;
    }
</style>