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
    devServer: { port: 8081} //设置端口
}