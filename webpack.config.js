/* eslint-disable no-undef */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const env = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: resolve(__dirname, './src/app.ts'),
  target: env ? 'web' : 'browserslist', // 有browserslist配置就默认使用browserslist导致代理服务器不会自动更新代码需加判断
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    targets: '> 0.25%, not dead',
                    corejs: 3,
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          env ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ]
                ]
              }
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html')
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin({
      exclude: ['node_modules', '**/*.styl'],
      files: ['src/**/*'],
      extensions: ['.js', '.ts'],
      fix: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/')
    },
    extensions: ['.ts', '.js', '.styl']
  },
}