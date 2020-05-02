<template>
    <div class="tob-bar bg-white box-s">
        <!-- lg终端及以上设备应用该导航 -->
        <div class="d-none d-lg-block">
            <div class="d-flex container px-0" style="height:53px">
                 <img src="~assets/img/logo.png" class="cursor-point" 
                    @click="$router.push('/')"
                     style="width:auto;height:53px" alt="">
                <div class="d-flex mx-2 bar-link text-grey-light">
                    <router-link class="nav-item" tag="div" active-class="barlink-active" to="/home">首页</router-link>
                    <router-link class="nav-item" tag="div" active-class="barlink-active" to="/categories">分类</router-link>
                    <router-link class="nav-item" tag="div" active-class="barlink-active" to="/hot">热榜</router-link>
                </div>
                <div class="py-1 nav-item" >
                    <input class="search-box bg-light px-1 text-grey" 
                    maxlength="15" v-model="searchKey" 
                    @keyup.enter="search()"
                    placeholder="搜索内容" type="text">
                    <button  class="search-btn px-2 cursor-point"
                    @click="search()"
                    >搜索</button>
                </div>
                <div class="py-1 px-3 flex-1 nav-item">
                    <router-link tag="button" class="bg-red btn cursor-point" to="/editor/new">写文章</router-link>
                </div>
                <div v-if="Object.keys(user).length == 0" class="py-1">
                    <button class="nav-item btn bg-grey cursor-point" @click="LoginShow=true">登录</button>
                    <button class="nav-item btn bg-black ml-2 cursor-point" @click="RegisterShow=true">加入</button>
                </div>
                <avatar @LoginOut="LoginOut"  v-else :user = 'user'></avatar>
            </div>
        </div>
        <!-- lg以下终端设备应用该导航 -->
        <div class="d-block d-lg-none">
            <div class="container px-0">
                <nav class="navbar navbar-expand-lg navbar-light d-flex align-items-center">
                    <img src="~assets/img/logo.png" class="navbar-brand cursor-point p-0" 
                    @click="$router.push('/')"
                     style="width:auto;height:53px" alt="">
                    <div class="py-1 d-none d-md-block" style="height:53px">
                        <input class="search-box bg-light px-1 text-grey" 
                        maxlength="15" v-model="searchKey" 
                         @keyup.enter="$router.push(`/search/${searchKey}`)"
                        placeholder="搜索内容" type="text">
                        <button @click="$router.push(`/search/${searchKey}`)" class="search-btn px-2 cursor-point">搜索</button>
                    </div>
                    <button class="navbar-toggler" data-toggle="collapse" data-target="#menu">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="menu" class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                            <div class="py-1 nav-item d-block d-md-none">
                                <input class="search-box bg-light p-1 text-grey" 
                                maxlength="15" v-model="searchKey" 
                                placeholder="搜索内容" type="text">
                                <button
                                @click="$router.push(`/search/${searchKey}`)"
                                class="btn px-2 bg-black cursor-point">搜索</button>
                            </div>
                            <li class="nav-item"><a href="/home" class="nav-link">首页</a></li>
                            <li class="nav-item"><a href="/categories" class="nav-link">分类</a></li>
                            <li class="nav-item"><a href="/hot" class="nav-link">热榜</a></li>
                            <li class="nav-item"><a href="/editor" class="nav-link">写文章</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">登录</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">注册</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>

        <login :is-show="LoginShow" @LoginSuccess="fetchUser"  @close="closeLogin()" @goRegister="goRegister()"></login>
        <Register :is-show="RegisterShow" @RegisterSuccess="fetchUser" @close="closeRegister()" @goLogin="goLogin()"></Register>
    </div>
</template>

<script>
    import Avatar from './Avatar.vue'
    import Login from 'views/Login/Login.vue'
    import Register from 'views/Login/Register.vue'

    export default {
        data(){
            return {
                user:{},
                searchKey:this.$route.params.searchkey || "",
                LoginShow:false,
                RegisterShow:false
            }
        },
        components:{
            Avatar,
            Login,
            Register
        },
        methods:{
            search(){
                this.searchKey = this.searchKey.trim()
                if(this.searchKey === ""){
                    alert("请输入要搜索的内容！")
                }else{
                    this.$router.push(`/search/${this.searchKey}`)
                }
            },
            async fetchUser(){
                console.log("ok")
                const res = await this.$http.get('users/nomust/info')
                this.user = res.data
            },
            closeLogin(){
                this.LoginShow = false
            },
            closeRegister(){
                this.RegisterShow = false
            },
            goRegister(){
                this.closeLogin()
                this.RegisterShow = true
            },
            goLogin(){
                this.closeRegister()
                this.LoginShow = true
            },
            LoginOut(){
                this.user = {}
                this.$router.replace('/')
            }
        },
        created(){
            this.fetchUser()
        }

    }
</script>

<style lang="scss" scoped>
@import "assets/scss/_variables.scss";
.bar-link{
    div{
        cursor: pointer;
        height: 100%;
        line-height: 53px;
        padding: 0 0.5rem;
        font-size: 1rem;
        margin-right: 1.7rem;
        border-bottom: 4px solid rgba(0,0,0,0);
    }
    div:hover{
        transition: 0.5ms;
        color: map-get($colors, 'grey');
    }
}
.barlink-active{
     border-color:map-get($colors, 'red')!important;
     color: map-get($colors, 'grey');
     font-weight: bold;
}
.search-box{
    border: none;
    height: 100%;
    font-size: 1rem;
    // width: 17vw;
    vertical-align:top;
    box-sizing: border-box;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
.search-btn{
    border: none;
    height: 100%;
    font-weight: bold;
    color: white;
    background: rgb(35, 31, 32);
    vertical-align:top;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
.btn{
    border-radius: 3px;
    height: 100%;
    color: white;
    border: none;
    font-weight: bold;
    padding: 0 .7rem;
}
.btn:hover,.search-btn:hover{
    transition: 100ms;
    opacity: 0.8;
}
.tob-bar{
    z-index: 10;
    position: sticky;
    top: 0;
}
</style>