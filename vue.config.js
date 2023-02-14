const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
      devtool: 'source-map'
  },
  devServer: {
      port: 8080
  }
})
