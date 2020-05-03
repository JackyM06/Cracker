<template>
    <div>
        <div v-if="users.length>0">
            <user-item class="px-3 py-2" 
            v-for="(item,key) in users" :key="key" :user='item'>
            <div slot="more">
                <span class="fs-xs text-grey-light">{{item.introduction}}</span>
            </div>
            </user-item>
        </div>
        <no-more v-else></no-more>
    </div>
    
</template>

<script>
    import UserItem from 'components/content/UserItem/UserItem.vue'
    import NoMore from 'components/content/NoMore/NoMore.vue'


    export default {
        props:{
            users:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            UserItem,
            NoMore
        }
    }
</script>

<style lang="scss" scoped>

</style>