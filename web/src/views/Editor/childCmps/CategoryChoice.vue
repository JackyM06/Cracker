<template>
    <panel class="bg-white mt-3" style="width:300px">
        <div class="px-3 py-4  text-grey-light">
            <h5 class="font-weight">发布文章</h5>
            <div class="mt-2">
                <span>已关注分类</span>
                <div class="d-flex flex-wrap py-2">
                    <cate-item v-for="(item,key) in User.categories" :key="key" 
                    :class="{'choice':isChoice(item._id)}" :isChoice="isChoice(item._id)"
                    :Category="item" @Choice="Choice(item._id)" @disChoice="disChoice(item._id)">{{item.name}}</cate-item>
                </div>
            </div>
            <div class="mt-2">
                <span>更多分类</span>
                <div class="position-relative">
                    <div class="d-flex flex-wrap py-2">
                        <cate-item v-for="(item,key) in moreCate" :key="key" 
                        :class="{'choice':isChoice(item._id)}" :isChoice="isChoice(item._id)"
                        :Category="item" @Choice="Choice(item._id)" @disChoice="disChoice(item._id)">{{item.name}}</cate-item>
                    </div>
                    <input type="text" placeholder="添加分类" 
                    class="searchInput fs-xs w-100"
                    @input="SearchCate" v-model="search">
                    <nor-panel v-show="cateRes.length>0" style="width:200px;left:0" class="bg-white mt-2 p-2">
                        <div>
                            <div v-for="(item,key) in cateRes" :key="key" 
                            class="searchItem py-1 cursor-point fs-sm"
                            @click="pushMoreChoice(item)"
                            >{{item.name}}</div>
                        </div>
                    </nor-panel>
                </div>
            </div>
            <span v-show="Categories.length >= 3" class="fs-xs text-red">最多选择3个分类</span>
            <div class="text-center mt-2">
                <button @click="$emit('Public')" class="followBtn fs-sm text-red px-2 py-1">确定并发布</button>
            </div>
        </div>
    </panel>
</template>

<script>
    import Panel from 'components/content/Panel/Panel.vue'
    import NorPanel from 'components/content/Panel/NorPanel.vue'
    import cateItem from './cateItem.vue'

    export default {
        props:{
            categoriesDefalut:Array
        },
        data () {
            return {
                search:"",
                User:{},
                Categories:[],
                cateRes:[],
                lazy:null,
                moreCate:[]
            }
        },
        methods: {
            async fetchUser(){
                const res = await this.$http.get(`rest/users/${'5e6c8193ee0d280fc02505c6'}`)
                this.User = res.data
                const UC = this.User.categories.map(e=>e._id)
                this.moreCate = this.categoriesDefalut.filter(de=>{
                    return !UC.includes(de._id)
                })
            },
            commit(){
                this.$emit('CateChange',this.Categories)
            },
            Choice(id){
                if(!this.Categories.includes(id) && this.Categories.length<3){
                    this.Categories.push(id)
                    this.commit()
                    return true
                }
                return false
            },
            disChoice(id){
                this.$set(this,'Categories',this.Categories.filter(e=>e!=id))
                this.commit()
            },
            isChoice(id){
                return this.Categories.includes(id)
            },
            SearchCate(){
                if(this.lazy)clearTimeout(this.lazy)
                this.lazy = setTimeout(async () => {
                    this.search = this.search.trim()
                    if(this.search != ""){
                        const res =  await this.$http.get('categories/page',{
                            params:{
                                pageSize:10,
                                searchKey:{name:this.search}
                            }
                        })
                        this.cateRes = res.data
                    }else{
                        this.cateRes = []
                    }
                }, 500);
            },
            pushMoreChoice(cate){
                if(this.Choice(cate._id)){  
                    this.moreCate.push(cate)
                    this.cateRes = []
                }
            }
        },
        components:{
            Panel,
            NorPanel,
            cateItem
        },
        async created(){
            await this.fetchUser()
            this.$set(this,'Categories',this.categoriesDefalut.map(e=>e._id))
        },
    }
</script>

<style lang="scss" scoped>
    .choice{
        border: 1px solid rgba(203, 56, 55,.2);
        background: rgba(203, 56, 55,.1);
        color: rgb(203, 56, 55);
    }
    .searchInput{
        border: none;
        outline: none;
        border-bottom: 1px solid #f0f2f7;
    }
    .searchItem:hover{
        color: rgb(203, 56, 55);
    }
</style>