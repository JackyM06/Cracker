<template>
    <div>
        <Dialog :is-show="isShow" @close="close">
            <h5 slot="title" class="font-weight">登录</h5>
            <div slot="body">
                <input type="text" v-model="e_mail" class="inputText" placeholder="请输入邮箱">
                <input type="password" v-model="password" class="inputText" placeholder="请输入密码">
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
      props:{
        isShow:Boolean
      },
      data () {
        return {
          e_mail:"ChinaMJK06@163.com",
          password:"123.123."
        }
      },
      methods:{
        close(){
          this.$emit('close')
        },
        goRegister(){
          this.$emit('goRegister')
        },
        async Login(){
          const res = await this.$http.post('login',{
            e_mail:this.e_mail,
            password:this.password
          })
          localStorage.token = res.data.token
          this.$emit('LoginSuccess')
          this.close()
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
