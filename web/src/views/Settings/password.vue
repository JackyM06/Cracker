<template>
    <card title="密码修改">
        <div slot="body">
            <edit-item title="旧密码">
                <input slot="body" type="password" placeholder="请输入原密码" class="textInput ml-3 fs-xxxl" v-model="oldPassword">
            </edit-item>
            <edit-item title="新密码">
                <input slot="body" type="password" placeholder="输入新密码" class="textInput ml-3" v-model="newPassword">
            </edit-item>
            <edit-item title="确认新密码">
                <input slot="body" type="password" placeholder="确认新密码" class="textInput ml-3" v-model="newPasswordCpy">
            </edit-item>
            <div class="text-right">
                <button class="followBtn py-2 px-3" @click="Save">保存修改</button>
            </div>
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
                oldPassword:"",
                newPassword:"",
                newPasswordCpy:"",
            }
        },
        components: {
            Card,
            EditItem
        },
        methods:{
            async Save(){
                if(this.oldPassword.length<6){
                    alert("请输入正确的原密码")
                }else if(this.newPassword.length<6){
                    alert("密码长度不能小于6位")
                }else if(this.newPassword != this.newPasswordCpy){
                    alert("两次输入的密码不一致")
                }else{
                    // 修改密码
                    alert("修改完成")
                }
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
        &::placeholder {
        color:#ccc;
        }
    }
</style>