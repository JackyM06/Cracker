/jpg/png<template>
    <card title="个人资料">
        <div slot="body">
            <edit-item title="头像">
                <div slot="body" class="d-flex align-items-end">
                    <img  :src="user.avatar" alt="" style="width:72px;height:72px"> 
                    <el-upload
                        :headers="authHeader"
                        :show-file-list="false"
                        :action="`${$http.defaults.baseURL}/upload`"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                      <button class="followedBtn py-1 ml-3">上传</button>
                      <!-- <div slot="tip" class="fs-xs">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>   
                </div>  
            </edit-item>
            <edit-item title="用户名">
                <input slot="body" type="text" @focus="currentChange(0,$event.target,false)" class="textInput" v-model="user.name">
                <span v-if="current != 0" @click="currentChange(0,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField('name')" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('name')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
            <edit-item title="职位">
                <input slot="body" type="text" @focus="currentChange(1,$event.target,false)" class="textInput" v-model="user.position">
                <span v-if="current !=1 " @click="currentChange(1,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField('position')" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('position')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
            <edit-item title="公司">
                <input slot="body" type="text" @focus="currentChange(2,$event.target,false)" class="textInput" v-model="user.company">
                <span v-if="current != 2" @click="currentChange(2,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField('company')" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('company')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
            <edit-item title="个人介绍">
                <input slot="body" type="text" @focus="currentChange(3,$event.target,false)" class="textInput" v-model="user.introduction">
                <span v-if="current != 3" @click="currentChange(3,$event.target.previousSibling.children[0])" slot="right" class=" cursor-point ml-3 text-red">修改</span>
                <div v-else  slot="right">
                    <span @click="saveField('introduction')" class="pr-3 text-red cursor-point">保存</span>
                    <span @click="cancelEdit('introduction')" class=" cursor-point text-grey-light">取消</span>
                </div>
            </edit-item>
        </div>
    </card>
</template>

<script>
    import Card from 'components/content/Card/Card.vue'
    import EditItem from './childCmps/EditItem.vue'

    export default {
        props:{
            user:Object
        },
        data () {
            return {
                current:-1,
                strCache:""
            }
        },
        components: {
            Card,
            EditItem
        },
        methods:{
            currentChange(value,target,isSel = true){
                this.strCache = target.value
                this.current = value
                target.focus()
                if(isSel)target.select()
            },
            async saveField(key){
                await this.$http.put('users/field',{
                    [key]:this.user[key]
                })
                this.$message.success("修改成功")
                this.current = -1
            },
            cancelEdit(key){
                this.user[key] = this.strCache
                this.current = -1
            },
            beforeAvatarUpload(file){
                const isJPG = 
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/jpg'

                const isLt2M = file.size / 1024 < 500
                
                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
                }else if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 500KB!')
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res){
                this.user.avatar = res.url
                this.saveField('avatar')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .textInput{
        width: 100%;
        outline: none;
        border: none;
        color: #999;
        font-size: 1rem;
        padding: 10px 0;
    }
</style>