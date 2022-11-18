const { defineConfig } = require('@vue/cli-service')

//element-plus插件
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,

  //element-plus插件
  configureWebpack: config => {
    config.plugins.push(AutoImport({
      resolvers: [ElementPlusResolver()],
    }));
    config.plugins.push(Components({
      resolvers: [ElementPlusResolver()],
    }));
  },

  // 代理解决跨域
  devServer: {
    https: false,
    // hotOnly: false, //如果运行报错 注释这一行
    proxy: {
      '/api': {
        target: 'https://lianghj.top:8888/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // 导入全局css变量
  css: {
    loaderOptions: {
      sass: {
        additionalData: // 8版本用prependData: 12版本用additionalData
          // `
          //   @import "@/styles/variables.scss";  // scss文件地址
          //   @import "@/styles/mixin.scss";     // scss文件地址
          // `
          `
        @import "@/styles/mixin.scss";     // scss文件地址
      `
      }
    }
  }

})
