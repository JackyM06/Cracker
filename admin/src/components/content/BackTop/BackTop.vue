<template>
    <el-backtop :target="target">
            <div
            style="{
              height: 100%;
              width: 100%;
              border-radius:50%;
              box-shadow: 0 0 6px rgba(0,0,0, .12);
              background-color: #f1f1f1;
              text-align: center;
              line-height: 40px;
              color: rgb(84, 92, 100);
              }"
              >
              <i class="el-icon-caret-top"></i>
            </div>
        </el-backtop>
</template>

<script>
    export default {
        props:{
            target:String
        }
    }
</script>

<style lang="scss" scoped>

</style>