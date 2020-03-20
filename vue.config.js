/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 17:07:17
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'https://testadmin.ebuyhouse.com:8066',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx'] // 加入ts 和 tsx
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/assets/css/config.scss')]
    }
  }
}
