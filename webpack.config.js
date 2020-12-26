const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  devServer: {
    publicPath: '/dist/',
    contentBase: './public',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    publicPath: './public',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
    ],
  },
};
