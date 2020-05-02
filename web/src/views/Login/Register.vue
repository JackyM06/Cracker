<template>
    <div>
        <Dialog :is-show="isShow" @close="close">
            <h5 slot="title" class="font-weight">注册</h5>
            <div slot="body">
                <form action="" @submit.prevent="Register">
                  <input type="text" v-model="name" class="inputText mb-2" placeholder="请输入用户名">
                  <input type="email" v-model="e_mail" class="inputText mb-2" placeholder="请输入邮箱">
                  <div class="d-flex mb-2">
                      <input type="text" v-model="VeriCode" class="inputText flex-1 mr-4" maxlength="6" placeholder="邮箱验证码">
                      <button class="followBtn fs-sm py-1 px-2" @click.prevent="getVeriCode">获取验证码</button>
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
      props:{
        isShow:Boolean
      },
      data () {
        return {
          e_mail:"",
          name:"",
          password:"",
          VeriCode:""
        }
      },
      methods:{
        close(){
          this.e_mail = ""
          this.name = ""
          this.password = ""
          this.VeriCode = ""
          this.$emit('close')
        },
        goLogin(){
          this.$emit('goLogin')
        },
        async Register(){
          const res = await this.$http.post('register/new',{
            name:this.name,
            e_mail:this.e_mail,
            password:this.password,
            veri_code:this.VeriCode
          })
          if(res.data.token){
            localStorage.token = res.data.token
            await this.$emit('RegisterSuccess')
            this.close()
          }
        },
        async getVeriCode(){
          const res = this.$http.post('register/vericode',{e_mail:this.e_mail})
          console.log(res.data)
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
</style>