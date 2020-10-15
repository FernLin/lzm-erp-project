module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
		'component-scss',
		{
			libraryName: 'element-ui',
			styleLibraryName: 'theme-chalk/src',
			ext: '.scss'
		}
	]
  ],
};
