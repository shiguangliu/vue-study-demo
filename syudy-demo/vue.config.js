const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8000,
    host:'localhost',
  },
  lintOnSave: false
})
