<template>
    <div>
       <div class="w-100 input d-flex bg-white border-b align-items-center px-3">
            <input type="text" maxlength="80" class=" flex-1 titleInput px-2" 
            v-model="Article.title" placeholder="输入文章标题...">
            <div class="text-grey-light">
                <span class="d-none d-md-inline-block">文章将会自动保存至</span>
                <button class="btn text-grey-light py-1 px-2 fs-sm ml-3" style="border-color:#f0f2f7">草稿</button>
            </div>
            <div class="position-relative mx-3">
               <button class="text-red bg-white border-0" style="outline:none"
               @click="publishClick()">发布
                   <svg class="icon" style="padding:3px" :class="{'Reversal':publish}" aria-hidden="true">
                        <use xlink:href="#icon-sanjiaoxing"></use>
                    </svg>
               </button>
               <panel v-show="publish" class="bg-white mt-3" style="width:300px">
                   <div class="px-3 py-4  text-grey-light">
                       <h5 class="font-weight">发布文章</h5>
                       <div class="mt-2">
                           <span>分类</span>
                       </div>
                       <div class="mt-2">
                           <span>更多分类</span>
                       </div>
                       <div class="text-center mt-2">
                           <button class="followBtn fs-sm text-red px-2 py-1">确定并发布</button>
                       </div>
                   </div>
               </panel>
            </div>
            <div>
                <img src="http://localhost:3000/uploads/9360cdb34be562d7f3a1899c57f3ba99" style="width:30px;height:30px" alt="">
            </div>
       </div>
        <mavon-editor
            class="editor-body" style="z-index:1"
            v-model="Article.content"
            :toolbars = "toolbars"
        ></mavon-editor>
    </div>
</template>

<script>
    import Panel from 'components/content/Panel/Panel.vue'
    export default {
        data () {
            return {
                Article:{
                    content:"",
                    title:""
                },
                publish:false,
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        methods:{
            publishClick(){
                this.publish = !this.publish
            }
        },
        components:{
            Panel
        }
    }
</script>

<style lang="scss" scoped>
    .input{
        height: 60px;
    }
    .editor-body{
        position: absolute;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .titleInput{
        font-size: 1.5rem;
        width: 0;
        font-weight: bold;
        border: none;
    }
    .Reversal{
        transition: 100ms;
        transform:rotate(180deg);
    }

</style>