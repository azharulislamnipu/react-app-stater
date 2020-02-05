const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
module.exports = {
  entry: {
    app:'./src/index.js'
  },
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'assets/js/[name][chunkhash].js'
  },
  optimization: {
    splitChunks:{
      chunks:'all'
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback:true,
    watchContentBase: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:4000',
        secure: false,
        changeOrigin: true,
      }
    },
  },
  devtool:'sourcemap',
  module: {
    rules: [
        {
        test: /\.(js|jsx)$/,
        use: {loader: 'babel-loader'},
        exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader:MiniCssExtractPlugin.loader
                }
                , 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap','postcss-loader']
                
        },
        {
          test: /\.(gif|png|jpe?g|svg|svg|woff|woff2|ttf|eot)$/i,
          use: [
              {
                loader: 'url-loader',
                options: {
                  outputPath: 'assets/images',
                  limit:154000,
                  name: '[name].[ext]?[hash]'
                }
              }
              ,'image-webpack-loader']
      }
    ]
  
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/styles.css",
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      template: path.resolve(__dirname, 'src/', 'index.html'),
      filename: 'index.html',
        inject: true
      }),
      new ImageminPlugin(),
      new CleanWebpackPlugin()
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
};