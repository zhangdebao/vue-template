module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ],
  "env": {
    "test": {
      "presets": [["@babel/env", { "targets": { "node": "current" } }]]
    }
  },
  plugins: ["transform-es2015-modules-commonjs"]  // 将非es模块文件， 转为es模块
}
