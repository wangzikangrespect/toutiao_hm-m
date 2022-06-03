module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //   表示设计稿的基准值，即设计稿宽度的10分之一
      rootValue: 37.5,
      // 转换的目标，* 表示全部转换
      propList: ['*']
    }
  }
}
