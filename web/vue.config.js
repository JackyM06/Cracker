const webpack = require("webpack");
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
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
              })
        ]
    },
    devServer: { port: 8083}, //设置端口
    publicPath:process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

    outputDir:__dirname+'/../server/web',
}