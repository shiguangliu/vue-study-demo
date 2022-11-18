const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8010',
        changeOrigin: true, // 是否跨域
        pathRewrite: { // pathRewrite的作用是把请求接口中的api替换成空
          // '^/api': ''
        }
      }
    }
  }
})