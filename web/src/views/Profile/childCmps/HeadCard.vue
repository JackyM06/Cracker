<template>
    <div v-if="Object.keys(User).length>0" class="card-s bg-white p-4 d-md-flex mt-2 text-md-left text-center">
        <img :src="User.avatar" alt="" class="MaxAvatar">
        <div class="ml-4 d-flex flex-column justify-content-between flex-1">
            <h5 class="text-md-left font-weight my-2 my-md-0">{{User.name}}</h5>
            <div class="text-md-left text-gray-sl fs-sm">
                <svg class="icon fs-xl pt-1" aria-hidden="true">
                  <use xlink:href="#icon-position"></use>
                </svg>
                <span class="pl-1">{{User.position}}</span>
                <span class="split"></span>
                <span>{{User.company}}</span>
            </div>
            <div class="text-md-left text-gray-sl fs-sm" >
                <svg class="icon fs-xl pt-1" aria-hidden="true">
                  <use xlink:href="#icon-introduction"></use>
                </svg>
                <span class="pl-1" >{{User.introduction}}</span>
            </div>
        </div>
        <div class="ml-4 d-md-flex flex-column justify-content-between">
            <div class="d-md-flex justify-content-end">
                <a v-for="(item,key) in User.link" :key="key" 
                class="pr-2" :class="{'isNull':item === ''}"
                :href="item!=''?item:null" target="_blank">
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="`#icon-${key}`"></use>
                    </svg>
                </a>
            </div>
            <button v-if="User.canEdit" class="fs-sm flex-grow-0 followBtn text-red py-1 px-2">编辑个人资料</button>
            <button v-else class="fs-sm flex-grow-0 followBtn text-red py-1 px-2">关注</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            User:Object
        }
    }
</script>

<style lang="scss" scoped>

</style>