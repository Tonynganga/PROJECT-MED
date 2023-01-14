// CSS loader with some configuration
// read https://github.com/webpack/css-loader to understand each query parameters
var CSSLoader = [
    'css-loader?sourceMap&-minimize',
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]__[hash:base64:5]'
  ].join('&');
   
  module.exports = {
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: ['style-loader', CSSLoader]
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }]
    }
  };