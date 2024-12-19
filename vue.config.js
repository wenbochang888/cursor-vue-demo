// vue.config.js
module.exports = {
    devServer: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://101.33.233.214:8989',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      }
    }
  };
  