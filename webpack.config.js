const path = require('path');

module.exports = {
  entry: './src/main.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // or 'production' for minified files
};
