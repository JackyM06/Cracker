<template>
    <div class="container">
        <div class="row">
            <div class="col-0 col-md-2"></div>
            <mavon-editor
                class="m-0 p-0 mk-content col-12 col-md-8"
               :value="About.content"
               :subfield = "prop.subfield"
               :defaultOpen = "prop.defaultOpen"
               :toolbarsFlag = "prop.toolbarsFlag"
               :editable="prop.editable"
               :scrollStyle="prop.scrollStyle"
            ></mavon-editor>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                About:{
                    content:""
                }
            }
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
            },
        },
        methods:{
            async fetchAbout(){
                const res = await this.$http.get('rest/abouts/page')
                this.About = res.data[0]
            }
        },
        created(){
            this.fetchAbout()
        }
    }
</script>

<style lang="scss" scoped>
    .mk-content{
        position: relative!important;
        z-index: 0!important;
        box-shadow: none!important;
        background: rgba(#fff,1);
        min-height: 100vh;
    }
</style>