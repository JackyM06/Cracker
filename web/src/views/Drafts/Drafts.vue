<template>
    <div class="container">
        <div class="row mt-2">
            <div class="col-0 col-lg-2 "></div>
            <card class=" bg-white col-12 col-lg-8 px-0" title="草稿箱" v-if="infoList.length == 0">
                <no-more slot="body"></no-more>
            </card>
            <card v-else class=" bg-white col-12 col-lg-8 px-0" title="草稿箱">
                <div slot="body">
                    <draft-item class="border-b" v-for="(item,key) in infoList" 
                    :draft="item" :key="key" @deleteSuc="deleteDraft(key)"></draft-item>
                </div>
                <under-line slot="foot"></under-line>
            </card>

        </div>
    </div>
</template>

<script>
    import Card from 'components/content/Card/Card.vue'
    import UnderLine from 'components/content/UnderLine/UnderLine.vue'
    import NoMore from 'components/content/NoMore/NoMore.vue'

    import DraftItem from './childCpms/DraftItem.vue'

    export default {
        data(){
            return{
                page:0,
                infoList:[],
            }
        },
        components:{
            Card,
            UnderLine,
            DraftItem,
            NoMore
        },
        methods:{
            async fetchDraftsList(){
                const res =  await this.$http.get('articles/drafts/page',{params:{current:this.page++}})
                this.infoList.push(...res.data)
            },
            deleteDraft(key){
                this.infoList.splice(key,1)
            }
        },
        created(){
            this.fetchDraftsList()
            // 防抖式到达底部后自动获取文章数据
            window.onscroll = this.debounce(()=>{
                const SH = document.body.scrollHeight //获取当前页面总长度
                const ST = document.documentElement.scrollTop || document.body.scrollTop  //当前元素到页面顶部的距离
                const CH = document.body.clientHeight //当前浏览器可视的高度
                if(SH - Math.ceil(CH+ST) < 100){
                    this.fetchDraftsList()
                }
            },300)
        }

    }
</script>

<style lang="scss" scoped>

</style>