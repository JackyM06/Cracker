<template>
    <div>
        <el-backtop target=".el-menu-demo"></el-backtop>
        <el-menu
          :default-active="'/main/'"
          style=" position:sticky;top:0px;border-bottom:none; padding:0 12%;z-index:999"
          class="el-menu-demo box-s" 
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b">
          <el-menu-item index="/main/">数据统计</el-menu-item>
          <el-submenu index="2">
            <template slot="title">用户管理</template>
            <el-menu-item  index="/main/article">文章管理</el-menu-item>
            <el-menu-item index="/main/user">账号管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
              <template slot="title">内容管理</template>
              <el-menu-item index="3-1">分类管理</el-menu-item>
              <el-menu-item index="3-2">社区公告</el-menu-item>
              <el-menu-item index="3-3">关于页管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4" style="position:absolute;right:12%;">
              <template slot="title"><i class="el-icon-setting"></i>Admin</template>
              <el-menu-item index="4-1"><i class="el-icon-edit"></i>管理员账号设置</el-menu-item>
              <el-menu-item index="4-2"><i class="el-icon-guide"></i>切换账号</el-menu-item>
              <el-menu-item index="4-3"><i class="el-icon-turn-off"></i> 退出</el-menu-item>
          </el-submenu>
        </el-menu>
        <keep-alive include="ArticleList">
            <router-view class="" style="padding:1rem 12%;height:90.6vh;overflow-y:scroll;" :key="$route.path"></router-view>
        </keep-alive>
        
    </div>
</template>

<script>
    export default {
        methods:{
            handleSelect(){

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>