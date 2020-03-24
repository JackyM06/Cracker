<template>
    <el-upload
      class="avatar-uploader"
      :headers="authHeader"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :action="uploadURL"
      :on-success="res=>$emit('success',res.url)">
      <img v-if="imgSrc" :src="imgSrc" style="width:100px;height:100px;" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    export default {
        props:{
            imgSrc:String,
        },
        methods:{
            beforeAvatarUpload(file) {
                const isJPG = ['image/jpeg','image/bmp','image/png'].includes(file.type);
                console.log(file.type)
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                  this.$message.error('上传头像图片只能是JPG/PNG/BMP格式!');
                }
                if (!isLt1M) {
                  this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            }
        },
        // watch:{
        //   imgSrc(newValue){
        //     this.$set(this,'imgSrc',newValue)
        //   }
        // }
    }
</script>

<style lang="scss" scoped>

</style>