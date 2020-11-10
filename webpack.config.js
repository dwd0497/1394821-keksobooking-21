const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: false,
};
