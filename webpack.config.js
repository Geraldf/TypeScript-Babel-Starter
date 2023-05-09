// webpack.config.js
const path = require('path')
module.exports = {
  entry: './src/Index.tsx', // Changed the entry file name
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,    // add |ts
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {       
      directory: path.resolve(__dirname, './dist')
    }
  }
}