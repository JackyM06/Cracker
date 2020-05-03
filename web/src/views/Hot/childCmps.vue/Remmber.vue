<template>
    <card title="热门动态" class="bg-white">
        <div slot="body">
            <div v-for="(item,key) in infoList" :key="key" class="mb-1">
                <span @click="$router.push(`post/${item._id}`)" class="fs-sm text-ellipsis w-100 cursor-point">{{item.title}}</span>
            </div>
        </div>
    </card>
</template>

<script>
    import Card from 'components/content/Card/Card.vue'
    export default {
        data () {
            return {
                infoList:[]
            }
        },
        components:{
            Card
        },
        methods:{
            async fetchArticleList(){
                const res =  await this.$http.get('rest/articles/page',{
                    params:{
                        current:this.page++,
                        sort:'updatedAt',
                        pageSize:10
                    }
                })
                this.infoList.push(...res.data.map(e=>{
                    return {
                        _id:e._id,
                        title:e.title
                    }
                }))
            },
        },
        created(){
            this.fetchArticleList()
        }
    }
</script>

<style lang="scss" scoped>

</style>