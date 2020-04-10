<template>
    <div>
        <div class="border-b d-flex px-2 py-1" v-for="(item,key) in Comments" :key="key">
            <img :src="item.user.avatar" style="width:40px;height:40px" class="avatar mr-3" alt="">
            <div class="flex-1 fs-sm">
                <span>{{item.user.name}}</span>
                <p class="my-2">{{item.content}}</p>
                <div class="text-grey-light d-flex">
                    <span class="text-grey-light flex-1">{{item.createDate | date}}</span>
                    <div class="mr-5">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zan1"></use>
                        </svg>
                    </div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-huifu1"></use>
                        </svg>
                        <span>回复</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    // import CommentItem from './CommentItem.vue'
    export default {
        props:{
            Comments:Array
        },
        components:{
            // CommentItem
        }
    }
</script>

<style lang="scss" scoped>

</style>