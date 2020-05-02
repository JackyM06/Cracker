<template>
    <div>
        <Dialog :is-show="isShow" @close="close">
            <h5 slot="title" class="font-weight">注册</h5>
            <div slot="body">
                <input type="text" v-model="name" class="inputText" placeholder="请输入用户名">
                <input type="e-mail" v-model="e_mail" class="inputText" placeholder="请输入邮箱">
                <input type="password" v-model="password" class="inputText" placeholder="请输入密码（不少于6位）">
                <button class="followedBtn w-100 py-1" @click="Register">注册</button>
                 <div class="fs-sm mt-2">
                  <span class="text-grey-light">已有账号？</span>
                  <span class=" cursor-point text-red pl-2" @click="goLogin">去登录</span>
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
          e_mail:"",
          name:"",
          password:""
        }
      },
      methods:{
        close(){
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
          })
          if(res.data.token){
            localStorage.token = res.data.token
            await this.$emit('RegisterSuccess')
          }
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