<template>
    <div class=" position-relative">
       <div class="bg-white position-static" style="top:0px">
           <div class="container">
               <div  class="fs-sm d-flex py-3 border-b text-grey-light justify-content-between justify-content-md-start">
                    <router-link tag="span" class="mr-md-3 cursor-point" active-class="text-red" to="/settings/profile">个人资料</router-link>
                    <router-link tag="span" class="mr-md-3 cursor-point" active-class="text-red" to="/settings/password">密码修改</router-link>
                    <router-link tag="span" class="mr-md-3 cursor-point" active-class="text-red" to="/settings/link">社交链接</router-link>                    
               </div>
           </div>
       </div>
       <div class="container">
           <div class="row">
               <div class="col-12 col-md-9 px-0">
                   <div class="card-s bg-white mt-3">
                        <router-view :user = 'User'></router-view>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                User:{
                    link:{}
                }
            }
        },
        methods:{
            async fetchUser(){
                const res = await this.$http.get('users/info')
                this.User = res.data
            }
        },
        created(){
            this.fetchUser()
        },
        beforeRouteEnter(to, from, next){
            next(vm=>{
                if(!vm.$store.state.Logged) vm.$router.go(-1)
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>