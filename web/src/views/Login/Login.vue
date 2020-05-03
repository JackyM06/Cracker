<template>
    <div>
        <Dialog :is-show="$store.state.LoginShow" @close="close">
            <h5 slot="title" class="font-weight">登录</h5>
            <div slot="body">
                <input type="text" v-model="e_mail" class="inputText" placeholder="请输入邮箱">
                <input type="password" v-model="password" @keyup.enter="Login" class="inputText" placeholder="请输入密码">
                <button class="followedBtn my-1 w-100 py-1" @click="Login">登录</button>
                <div class="fs-sm mt-2">
                  <span class="text-grey-light">没有账号？</span>
                  <span class=" cursor-point text-red pl-2" @click="goRegister">注册</span>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
    import Dialog from 'components/content/Dialog/Dialog.vue'
    export default {
      data () {
        return {
          e_mail:"",
          password:""
        }
      },
      methods:{
        close(){
          this.e_mail = ""
          this.password = ""
          this.$store.commit('closeLoginShow')
        },
        goRegister(){
          this.close()
          this.$store.commit('openRegisterShow')
        },
        async Login(){
          if(this.VeriForm()){
            const res = await this.$http.post('login',{
              e_mail:this.e_mail,
              password:this.password
            })
            localStorage.token = res.data.token
            this.$message.success("登入成功")
            this.$store.commit("Login")
            this.$emit('LoginSuccess')
            this.close()
          }
        },
        VeriForm(){
          const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ 
          if(!regEmail.test(this.e_mail)){
            this.$message.error("请输入正确格式的邮箱地址！")
            return false
          }
          if(this.password.length<6){
            this.$message.error("请输入正确的密码格式！")
            return false
          }
          return true
        }
      },
      components:{
        Dialog
      },
    }
</script>

<style lang="scss" scoped>
  .inputText{
    padding: 9px 10px;
    border-radius: 3px;
    border: 1px solid #ddd;
    width: 100%;
    margin-bottom: 10px;
    font-size: .9rem;
    &::placeholder{
      color:#ccc;
    }
  }
</style>
