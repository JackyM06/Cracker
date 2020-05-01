<template>
    <div>
        <h3 class="bg-white-gray text-center py-3 py-md-5 text-gray-sl font-weight" >分类</h3>
        <div class="container bg-white box-s my-0">
            <div class="row py-3">
                <category-item v-for="(item,key) in categories" :key="key"
                :category="item"
                ></category-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryItem from './childCmps/CategoryItem.vue'

    export default {
        name:'category',
        data () {
            return {
                categories:[],
                page:0
            }
        },
        components:{
            CategoryItem
        },
        methods:{
            async fetchCategories(){
                const res = await this.$http.get('categories/page',{params:{
                    current:this.page++
                }})
                this.categories.push(...res.data)
            }
        },
        created(){
            this.fetchCategories()
            window.onscroll = this.debounce(()=>{
                const SH = document.body.scrollHeight //获取当前页面总长度
                const ST = document.documentElement.scrollTop || document.body.scrollTop  //当前元素到页面顶部的距离
                const CH = document.body.clientHeight //当前浏览器可视的高度
                if(SH - Math.ceil(CH+ST) < 100){
                    this.fetchCategories()
                }
            },300)
        }
    }
</script>

<style lang="scss" scoped>

</style>