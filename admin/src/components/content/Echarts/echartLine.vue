<template>
    <chart  :options="options" :auto-resize="true"></chart>
</template>

<script>
    import 'echarts/lib/chart/line'
    export default {
        props:{
            title:String,
            Cats:Array,
            xData:Array
        },
        data () {
            return {
                options:{}
            }
        },
        created(){
            this.options =  {
                title: {
                    left:'center',
                    top:"0",
                    text: this.title
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top:"40",
                    data: this.Cats.map(e=>e.name)
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '20%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: this.Cats.map(e => {e.type = "line";return e})
            }
        },
        watch:{
            Cats(newValue){
                this.$set(this.options,'series',newValue.map(e => {e.type = "line";return e}))
                this.$set(this.options.legend,'data',newValue.map(e=>e.name))
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>