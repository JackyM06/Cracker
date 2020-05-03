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
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
      ],
      publicPath:process.env.NODE_ENV === 'production'
      ? '/admin/'
      : '/',
  
      outputDir:__dirname+'/../server/admin',
}