<template>
    <div>
        <Dialog :is-show="isShow">
            <h5 slot="title" class="font-weight">注册</h5>
            <div slot="body">
                <input type="text" class="inputText" placeholder="请输入用户名">
                <input type="text" class="inputText" placeholder="请输入邮箱">
                <input type="password" class="inputText" placeholder="请输入密码（不少于6位）">
                <button class="followedBtn w-100 py-1">注册</button>
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
      components:{
        Dialog
      }
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