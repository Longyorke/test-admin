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
  }
})


