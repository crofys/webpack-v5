import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isDev = process.env.NODE_ENV === 'development'

type TCssTypes = "css" | "less" | "sass"
export const CssLoader = (type :TCssTypes = 'css') => {
  const types = {
    css: /\.css$/,
    less: /\.less$/,
    sass: /\.(sa|sc)ss$/,
  }
  const loader = {
    test: types[type],
    // exclude: /node_modules/,
    use: [
      isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          plugins: () => [
            // 可以配置多个插件
            require('postcss-preset-env')(),
            require('autoprefixer')(),
          ],
        },
      },
      type === 'less'
        ? {
            loader: 'less-loader',
          }
        : type === 'sass'
        ? {
            loader: 'sass-loader',
          }
        : {},
    ],
  }
  if (type === 'css') loader.use.pop()
  return loader
}
