<template>
    <div v-if="Object.keys(user).length>0" class="card-s bg-white p-4 d-md-flex mt-2 text-md-left text-center">
        <img :src="user.avatar" alt="" class="MaxAvatar">
        <div class="ml-4 d-flex flex-column justify-content-between flex-1">
            <h5 class="text-md-left font-weight my-2 my-md-0">{{user.name}}</h5>
            <div class="text-md-left text-gray-sl fs-sm">
                <svg class="icon fs-xl pt-1" aria-hidden="true">
                  <use xlink:href="#icon-position"></use>
                </svg>
                <span class="pl-1">{{user.position}}</span>
                <span class="split"></span>
                <span>{{user.company}}</span>
            </div>
            <div class="text-md-left text-gray-sl fs-sm" >
                <svg class="icon fs-xl pt-1" aria-hidden="true">
                  <use xlink:href="#icon-introduction"></use>
                </svg>
                <span class="pl-1" >{{user.introduction}}</span>
            </div>
        </div>
        <div class="ml-4 d-md-flex flex-column justify-content-between">
            <div class="d-md-flex justify-content-end">
                <a v-for="(item,key) in user.link" :key="key" 
                class="pr-2" :class="{'isNull':item === ''}"
                :href="item!=''?item:null" target="_blank">
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="`#icon-${key}`"></use>
                    </svg>
                </a>
            </div>
            <button v-if="user.canEdit" class="fs-sm flex-grow-0 followBtn text-red py-1 px-2">编辑个人资料</button>
            <user-watch v-else :id="user._id"></user-watch>
        </div>
    </div>
</template>

<script>
    import UserWatch from 'components/content/Watched/UserWatch.vue'
    export default {
        props:{
            user:Object
        },
        components:{
            UserWatch
        }
    }
</script>

<style lang="scss" scoped>

</style>