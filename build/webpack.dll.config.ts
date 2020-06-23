import webpack from 'webpack'
import { Resolve } from './utils'

module.exports = {
  name: 'vendor',
  entry: ['react'], // 这个例子我们打包 lodash 作为公共类库
  output: {
    path: Resolve('dist'),
    filename: 'vendor.dll.js',
    library: 'vendor_[hash]', // 打包后对外暴露的类库名称
  },

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: Resolve('dist/manifest.json'), // 使用 DLLPlugin 在打包的时候生成一个 manifest 文件
    }),
  ],
}
