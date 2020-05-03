<template>
    <div>
        <Dialog :is-show="$store.state.RegisterShow" @close="close">
            <h5 slot="title" class="font-weight">注册</h5>
            <div slot="body">
                <form action="" @submit.prevent="Register">
                  <input type="text" v-model="name" class="inputText mb-2" placeholder="请输入用户名">
                  <input type="email" v-model="e_mail" class="inputText mb-2" placeholder="请输入邮箱">
                  <div class="d-flex mb-2">
                      <input type="text" v-model="VeriCode" class="inputText flex-1 mr-4" maxlength="6" placeholder="邮箱验证码">
                      <button ref="getVeri" style="min-width:100px;font-size:.8rem"
                       :class="{'followBtn':Interval == 0,'disEnable':Interval>0}"
                       class="fs-sm py-1 px-1" @click.prevent="getVeriCode">
                        <span v-if="Interval == 0">获取验证码</span>
                        <span v-else>{{Interval}}s后重新获取</span>
                      </button>
                  </div>
                  <input type="password" v-model="password" class="inputText mb-2" placeholder="请输入密码（不少于6位）">
                  <input type="submit" class="followedBtn w-100 py-1" value="注册">
                   <div class="fs-sm mt-2">
                    <span class="text-grey-light">已有账号？</span>
                    <span class=" cursor-point text-red pl-2" @click="goLogin">去登录</span>
                  </div>
                </form>
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
          name:"",
          password:"",
          VeriCode:"",
          Interval:0, //设置计时器倒计时
        }
      },
      methods:{
        close(){
          this.e_mail = ""
          this.name = ""
          this.password = ""
          this.VeriCode = "",
          this.$store.commit('closeRegisterShow')
        },
        goLogin(){
          this.close()
          this.$store.commit('openLoginShow')
        },
        async Register(){
          if(this.VeriForm()){
            const res = await this.$http.post('register/new',{
              name:this.name,
              e_mail:this.e_mail,
              password:this.password,
              veri_code:this.VeriCode
            })
            if(res.data.token){
              localStorage.token = res.data.token
              this.$store.commit("Login")
              await this.$emit('RegisterSuccess')
              this.close()
            }
          }
        },
        async getVeriCode(){
          const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ 
          if(regEmail.test(this.e_mail)){
            await this.$http.post('register/vericode',{e_mail:this.e_mail})
            this.$refs.getVeri.setAttribute("disabled", true)
            this.Interval = 60
            let timer = setInterval(()=>{
              this.Interval--
              if(this.Interval == 0){
                this.$refs.getVeri.removeAttribute("disabled")
                clearInterval(timer)
              }
            },1000)
          }else{
            this.$message.error("请输入正确的邮箱地址！")
          }
        },
        VeriForm(){
          if(this.name.length<2){
            this.$message.error('请输入用户名（至少2个字符）')
            return false
          }
          if(this.VeriCode.length!=6 || isNaN(parseInt(this.VeriCode))){
            this.$message.error('请输入正确的验证码')
            return false
          }
          if(this.password.length<6){
            this.$message.error('请输入正确的密码')
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
    // margin-bottom: 10px;
    font-size: .9rem;
    &::placeholder{
      color:#ccc;
    }
  }
  .disEnable{
    border:1px solid #ddd;
    color:#ddd;
    background: white;
    border-radius: 3px;
  }

</style>