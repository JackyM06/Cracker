<template>
    <div class="bg-white px-5 box-s">
        <div class="d-flex" style="height:8vh">
            <div>
                <img src="~assets/img/logo.png" class="cursor-point" 
                @click="$router.push('/')"
                 style="width:auto;height:100%" alt="">
            </div>
            <div class="d-flex mx-2 bar-link text-grey-light">
                <router-link tag="div" active-class="barlink-active" to="/home">首页</router-link>
                <router-link tag="div" active-class="barlink-active" to="/categories">分类</router-link>
                <router-link tag="div" active-class="barlink-active" to="/hot">热榜</router-link>
            </div>
            <div class="py-1">
                <input class="search-box bg-light px-1 text-grey" 
                maxlength="15"
                placeholder="搜索内容" type="text">
                <button class="search-btn px-2 cursor-point">搜索</button>
            </div>
            <div class="py-1 px-3 flex-1">
                <router-link tag="button" class="bg-red btn cursor-point" to="">写文章</router-link>
            </div>
            <div class="py-1">
                <button class="btn bg-grey cursor-point">登录</button>
                <button class="btn bg-black ml-2 cursor-point">加入</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import "assets/scss/_variables.scss";
.bar-link{
    div{
        cursor: pointer;
        height: 100%;
        line-height: 8vh;
        padding: 0 0.5rem;
        font-size: 1rem;
        margin-right: 2.5rem;
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
    // font-size: 1rem;
    width: 17vw;
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
    width: 4.5rem;
    height: 100%;
    color: white;
    border: none;
    font-weight: bold;
}
</style>