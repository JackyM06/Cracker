<template>
    <div>
        <comment-input @commit = "CommentCom"></comment-input>
        <div class="border-b" v-for="(item,key) in Comments" :key="key">
            <comment-item :comment="item" :id="id" :comment-id = "item._id" @commitCom="commitResp">
                <div v-if="item.communicates.length>0"  class="bg-light p-1 mt-2" style="border-radius: 3px;">
                    <comment-item @commitCom="commitResp" :comment="response" :id="id" :comment-id = "item._id"
                    v-for="(response,res_key) in item.communicates" :key="res_key"
                    ></comment-item>
                </div>
            </comment-item>
        </div>
        <!-- <div class="getMore">加载更多···</div> -->
    </div>
</template>

<script>
    import CommentItem from './CommentItem.vue'
    import CommentInput from 'components/content/CommentInput/CommentInput.vue'

    export default {
        props:{
            id:String,
            Comments:Array
        },
        components:{
            CommentItem,
            CommentInput
        },
        methods:{
            CommentCom(content){
                this.commitResp({
                    content
                })
            },
            async commitResp(resp){
                console.log(resp)
                const res = await this.$http.put('/rest/articles/'+this.id,resp)
                this.$emit('editCom',res.data.comments)
            }
        }
    }
</script>

<style lang="scss">
    .getMore{
        cursor: pointer;
        padding:10px 0 ;
        text-align: center;
        color: brown;
    }
</style>