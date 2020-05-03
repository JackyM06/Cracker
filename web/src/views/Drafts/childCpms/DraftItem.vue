<template>
    <div class="py-2">
        <h5 @click="Edit()" 
        class="m-0 py-2 w-100 text-ellipsis">
        <span class="InfoTitle cursor-point">{{draft.title}}</span></h5>
        <div class="d-flex text-grey-light fs-sm">
            <span class="pr-3">{{draft.updatedAt | date}}</span>
            <span @click="Edit()" class="pr-3 cursor-point">编辑</span>
            <span class="cursor-point" @click="DeleteDraft()">删除</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            draft:Object
        },
        methods:{
            Edit(){
                this.$router.push(`/editor/${this.draft._id}`)
            },
            async DeleteDraft(){
                const res = await this.$http.delete(`articles/${this.draft._id}`)
                if(res.data.ok == 1){
                    this.$emit('deleteSuc')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>