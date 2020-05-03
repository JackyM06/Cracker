<template>
    <div class="loginContainer">
        <el-card class="cardContainer" style="min-width:400px">
            <div slot="header" class="text-center">
                <span>Cracker后台管理系统</span>
            </div>
            <el-form @submit.native.prevent = "login">
                <el-form-item label="手机号" >
                    <el-input maxlength="13"  v-model="model.teleNumber"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input show-password maxlength="20" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item class="d-flex jc-center">
                    <el-button type="info" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                model : {}
            }
        },
        methods:{
            async login(){
                const res = await this.$http.post('login',this.model)
                localStorage.token = res.data.token
                localStorage.admin = res.data.admin
                this.$router.push('/')
                this.$message({
                    type:'success',
                    message:"登录成功"
                })
            }
        }
    }
</script>

<style scoped>
    .loginContainer{
        width: 30vw;
        margin: 20vh auto;
    }
</style>