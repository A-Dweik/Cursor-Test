const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'ClientApp/main.ts'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'ClientApp')
      }
    }
  }
};
