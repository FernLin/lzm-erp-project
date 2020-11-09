const path = require("path");
module.exports = {
  publicPath: "./",
  //编译打包存放的目录默认dist
  outputDir: "dist",
  // 静态资源存放路径
  assetsDir: "static",
  // 默认在生成的静态资源文件名中包含hash以控制缓存
	filenameHashing: true,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://175.24.234.118:7979/erp",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "林棕梦ERP管理系统";
      return args;
    });
  },
  pluginOptions: {
	'style-resources-loader': {
		preProcessor: 'scss',
		patterns: [path.resolve(__dirname, 'src/style/_variables.scss')]
	}
}
};
