import webpack from 'webpack'
import merge from 'webpack-merge'
import BaseConfig from './webpack.base.config'

const DevConfig = merge(BaseConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    pathinfo: false,
  },
  devServer: {
    hot: true,
    open: true,
    // host: HOST,
    stats: 'errors-warnings',
    compress: false,
    historyApiFallback: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

module.exports = DevConfig
