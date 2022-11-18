const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: 'localhost',
    proxy: {
      '/user': {
        target: 'http://localhost:8090',
        changeOrigin: true, // 是否跨域
        // pathRewrite: { // pathRewrite的作用是把请求接口中的api替换成空
        //    '^/api': ''
        // }
      }
    }
  }
})