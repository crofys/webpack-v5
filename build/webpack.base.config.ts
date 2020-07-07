import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'

// import VueLoaderPlugin from 'vue-loader/lib/plugin'
import chalk from 'chalk'
import path from 'path'

import { Config, Resolve, CssLoader } from './utils'

const exclude = ['/node_modules/']

const BaseConfig: webpack.Configuration = {
  entry: ['./src/main.tsx'],
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: Config.PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        exclude,
        include: [/src/],
        loader: 'eslint-loader',
        options: {
          emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
          emitError: true, // 这个配置需要打开，才能在控制台输出error信息
          fix: true, // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
        },
      },
      {
        test: /\.js(x?)$/,
        exclude,
        include: [/src/],
        loader: 'babel-loader',
      },
      {
        test: /\.ts(x?)$/,
        exclude,
        include: [/src/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 这个配置需要打开，才能在控制台输出warning信息
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      CssLoader('less'),
      CssLoader('css'),
      CssLoader('sass'),
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              esModule: false,
              // 分离图片至imgs文件夹
              name() {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]'
                }
                return 'images/[contenthash].[ext]'
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]'
                }
                return 'fonts/[contenthash].[ext]'
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
    /**
     * @description 定义全局变量插件
     */
    new webpack.DefinePlugin(
      (() => {
        const G_CONFIG: any = {}
        for (const key in Config) {
          if (Config.hasOwnProperty(key)) {
            G_CONFIG[key] = JSON.stringify(Config[key])
          }
        }
        return {
          G_CONFIG,
        }
      })(),
    ),
    /**
     * @description 复制资源插件
     */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: Resolve('public'),
          to: Resolve('dist'),
        },
      ],
    }),
    /**
     * @description webpack 构建进度条
     */
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      total: 100,
    }),
    // new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less', '.css', '.vue', '.json', '.ts', '.tsx'],
    alias: {
      '@': Resolve('src'),
    },
  },
  /**
   * @description 设置webpack 构建时候信息输出
   */
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
}
export default BaseConfig
