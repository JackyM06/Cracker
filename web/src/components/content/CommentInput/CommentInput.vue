<template>
    <div>
        <div class=" p-1 d-flex py-2">
        <input ref="ComInput" v-model="content" class="input flex-1 px-2 py-1 border-radius"
             type="text" maxlength="80" :placeholder="`回复${user}`"
             @show="console.log('tet')"
             @blur="$emit('blur')"
             >
        <button class="ml-1 border-radius px-3 py-1 bg-red" @click="$emit('commit',content);content=''">评论</button>
    </div>
    </div>
</template>

<script>
    export default {
        props:{
            user:{
                type:String,
                default:"作者"
            },
            id:String,
            isShow:Boolean
        },
        data () {
            return {
                content:""
            }
        },
    }
</script>

<style lang="scss" scoped>
.input{
    border: 1px solid brown;
    width: 0;
}
button{
    color: white;
    border: none;
}
</style>