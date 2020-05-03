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
                    this.$message.error("请输入正确的原密码")
                }else if(this.newPassword.length<6){
                    this.$message.error("密码长度不能小于6位")
                }else if(this.newPassword != this.newPasswordCpy){
                    this.$message.error("两次输入的密码不一致")
                }else{
                    const res = await this.$http.put('users/restpassword',{
                        user_id:this.user._id,
                        oldPassword:this.oldPassword,
                        newPassword:this.newPassword
                    })
                    if(res.data.message){
                        this.$message.sucess("修改完成,下次登录请使用新密码")
                    }
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