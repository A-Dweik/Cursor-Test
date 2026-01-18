const path = require("path");

module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  publicPath: "/applications/mobilephonestore",
  pwa: {
    workboxPluginMode: 'GenerateSW'
  },
  pages: {
    index: {
      entry: 'ClientApp/main.ts',
      template: 'ClientApp/public/index.html',
      filename: 'index.html'
    }
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "ClientApp")
      }
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: [/node_modules/, /public/],
          use: 'vue-template-loader'
        }
      ]
    }
  },
  chainWebpack: config => {
    config.plugin('html-index').tap(args => {
      if (args[0]) {
        args[0].minify = false;
      }
      return args;
    });
  },
  devServer: {
    port: 8080
  }
};
