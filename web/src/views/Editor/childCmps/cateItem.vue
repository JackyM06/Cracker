<template>
    <div @click="ChoiceClick" class="py-1 px-2 fs-xs mr-2 mb-3 cateItem">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        props:{
            isChoice:Boolean
        },
        data () {
            return {
                choice:false      
            }
        },
        methods:{
            ChoiceClick(){                
                this.choice = !this.choice
                if(this.choice)this.$emit('Choice')
                else this.$emit("disChoice")
            }
        },
        updated(){
            this.choice = this.isChoice
        }
    }
</script>

<style lang="scss" scoped>
    .cateItem{
        border: 1px solid #e0e2e6;
        cursor: pointer;
    }
    // .cateItem:hover{
    //     border: 1px solid rgba(203, 56, 55,.2);
    //     background: rgba(203, 56, 55,.1);
    //     color: rgb(203, 56, 55);
    // }
</style>