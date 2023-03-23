const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack: config => {
    // Add the vue-loader rule
    config.module.rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // Modify the options as needed
          return options;
        });
  }
});
