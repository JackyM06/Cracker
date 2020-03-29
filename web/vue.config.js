module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'components':'@/components',
                'views':'@/views',
                'common':'@/common',
                'network':'@/network'
            }
        }
    },
    devServer: { port: 8083} //设置端口
}