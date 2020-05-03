<template>
    <card title="社交链接">
        <div slot="body">
            <edit-item title="GitHub">
                <input slot="body" type="text" @focus="currentChange(1,$event.target,false)" class="textInput" v-model="user.link.github">
                <span v-if="current !=1 " @click="currentChange(1,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField()" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('github')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
            <edit-item title="新浪微博">
                <input slot="body" type="text" @focus="currentChange(2,$event.target,false)" class="textInput" v-model="user.link.sina">
                <span v-if="current != 2" @click="currentChange(2,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField()" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('sina')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
            <edit-item title="个性主页">
                <input slot="body" type="text" @focus="currentChange(3,$event.target,false)" class="textInput" v-model="user.link.self">
                <span v-if="current != 3" @click="currentChange(3,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField()" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('self')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
        </div>
    </card>
</template>

<script>
    import Card from 'components/content/Card/Card.vue'
    import EditItem from './childCmps/EditItem.vue'

    export default {
        props:{
            user:Object
        },
        data () {
            return {
                current:-1,
                strCache:""
            }
        },
        components: {
            Card,
            EditItem
        },
        methods:{
            currentChange(value,target,isSel = true){
                this.strCache = target.value
                this.current = value
                target.focus()
                if(isSel)target.select()
            },
            async saveField(){
                const res = this.$http.put('users/field',{
                    link:this.user.link
                })
                console.log(res)
                this.current = -1
            },
            cancelEdit(key){
                this.user.link[key] = this.strCache
                this.current = -1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .textInput{
        width: 100%;
        outline: none;
        border: none;
        color: #999;
        font-size: 1rem;
        padding: 10px 0;
    }
</style>