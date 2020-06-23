import webpack from 'webpack'
import merge from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import BaseConfig from './webpack.base.config'
import { Config } from './utils'

const DevConfig = merge(BaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'initial', //initial(初始块)、async(按需加载块)、all(全部块)，默认为all
      minChunks: 2, //表示被引用次数，默认为1；
      // maxInitialRequests: 5, //最大的按需(异步)加载次数，默认为1；
      // minSize: 2, //表示在压缩前的最小模块大小，默认为0；
      // maxInitialRequests: 1, //最大的初始化加载次数，默认为1；
      minSize: 1,
      cacheGroups: {
        commons: {
          name: 'common', //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    new OptimizeCSSAssetsPlugin({
      // 压缩css
      cssProcessorOptions: {
        safe: true,
      },
    }),
  ],
})

module.exports = DevConfig
