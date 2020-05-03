<template>
    <div class="d-flex mr-4" ref="avatar">
        <div class="d-flex align-items-center">
            <div class=" position-relative" @click="showPanel = !showPanel">
                <img :src="user.avatar" class="minAvatar  cursor-point"  alt="">
                <nor-panel class="bg-white card-s py-3" style="top:45px;width:160px" v-show="showPanel">
                    <div class="d-flex flex-column">
                        <router-link tag="span" class="py-2 px-3 cursor-point link-item"
                        to="/editor/new">
                        <svg class="icon mr-2" aria-hidden="true">
                          <use xlink:href="#icon-edit"></use>
                        </svg>
                        <span>写文章</span>
                        </router-link>
                        <router-link tag="span" class="py-2 px-3 cursor-point link-item"
                        to="/editor/drafts">
                        <svg class="icon mr-2" aria-hidden="true">
                          <use xlink:href="#icon-feather"></use>
                        </svg>
                        草稿</router-link>
                        <router-link tag="span" class="py-2 px-3 cursor-point link-item"
                        :to="`/profile/${user._id}`">
                        <svg class="icon mr-2" aria-hidden="true">
                          <use xlink:href="#icon-smile"></use>
                        </svg>
                        我的主页</router-link>
                        <router-link tag="span" class="py-2 px-3 cursor-point link-item"
                        to="/settings">
                        <svg class="icon mr-2" aria-hidden="true">
                          <use xlink:href="#icon-cog"></use>
                        </svg>
                        设置</router-link>
                        <span class="py-2 px-3 cursor-point link-item"
                        @click="LoginOut">
                        <svg class="icon mr-2" aria-hidden="true">
                          <use xlink:href="#icon-loop-arrow"></use>
                        </svg>
                        登出</span>
                    </div>
                </nor-panel>
            </div>
        </div>
    </div>
</template>

<script>
    import NorPanel from 'components/content/Panel/NorPanel.vue'
    export default {
        props:{
            user:Object
        },
        data () {
            return {
                showPanel:false
            }
        },
        methods:{
            LoginOut(){
                this.$emit('LoginOut')
            }
        },
        components:{
            NorPanel
        },
        created(){
            document.addEventListener('click',(e)=>{
                if(this.$refs.avatar){
                    let isSelf = this.$refs.avatar.contains(e.target)
                    if(!isSelf){
                        this.showPanel = false
                    }
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .minAvatar{
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .link-item{
        display: flex;
        align-items: center;
        color: #666;
    }
    .link-item:hover{
        background: #f6f6f6;
    }
</style>