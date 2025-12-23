const path = require("path");

module.exports = {
    publicPath: '/applications/ammanweather',
    chainWebpack: config => {
        config
            .entry("app")
            .clear()
            .add("./ClientApp/main.ts")
            .end();
        config.resolve.alias
            .set("@", path.join(__dirname, "./ClientApp"));
    },
     transpileDependencies: ['vuetify'],
     configureWebpack: {
        module: {
          rules: [
            {
              test: /.html$/,
              loader: "vue-template-loader",
              exclude: /index.html/
            }
          ]
        }
      }
};
