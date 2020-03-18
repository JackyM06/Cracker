<template>
    <chart ref="charts" :options="options" :auto-resize="true"></chart>
</template>

<script>
    import 'echarts/lib/chart/pie'
    import "echarts/lib/component/legendScroll";
    export default {
        props:{
            title:String,
            Cats:Array
        },
        computed: {
            CatsName(){
                return this.Cats.map(e=>e.name)
            }
        },
        data () {
            return {
                options:{}
            }
        },
        mounted(){
            this.options={
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    type:'scroll',
                    orient: 'vertical',
                    left: 2,
                    top: 20,
                    height:140,
                },
                 title: [{
                   left: 'center',
                   text: this.title
                }],
                series: [
                    {
                        name: '访问量',
                        type: 'pie',
                        radius: '63%',
                        left:150,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                    }
                ]
            }
        },
        watch:{
            Cats(newValue){
                this.$set(this.options.series[0],'data',newValue)
                this.$set(this.options.legend,'data',this.CatsName)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>