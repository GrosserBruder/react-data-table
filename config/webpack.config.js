const path = require('path');

const typeScriptRegex = /\.(ts|tsx)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  mode: 'development',
  // watch: true,
  // entry: path.resolve(__dirname, 'dist'),
  externals: {
    "react": "react",
    "react-dom": "react-dom",
  },
  entry: {
    main: './src/index.ts'
  },
  resolve: {
    alias: {
      "react": "@hot-loader/react",
      "react-dom": "@hot-loader/react-dom",
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
    library: "Library",
    libraryTarget: 'umd',
    umdNamedDefine: true,

  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: typeScriptRegex,
        // enforce: 'pre',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prod.json'
        }
      },
      // { test: typeScriptRegex, loader: "ts-loader" },
      {
        test: sassRegex, use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ],
  }
}