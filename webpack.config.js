var webpack = require('webpack');
const path = require('path');

module.exports = env => {

  config = {
    context: path.join(__dirname, 'src'),
    entry: [
      './main.js',
    ],
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        { 
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
        }
      ],
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.svg/,
          use: {
              loader: 'svg-url-loader',
              options: {}
          }
        }
      ]
    },
    resolve: {
      modules: [
        path.join(__dirname, 'node_modules'),
      ],
    },
    plugins: []
  };

  if (env.production) {
    config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    );

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
  }
  return config;
}