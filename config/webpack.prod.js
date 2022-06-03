const path = require('path');
const glob = require('glob')
const nodeExternals = require('webpack-node-externals');

const typeScriptRegex = /\.(ts|tsx)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const entries = glob.sync('./src/**/*.ts*').reduce((acc, path) => {
  const entry = path.replace(/\/*\.tsx?/, '').replace(/\.\/src\//, '')
  acc[entry] = path
  return acc
}, {})

module.exports = {
  mode: 'production',
  externals: [nodeExternals()],
  entry: entries,
  resolve: {
    alias: {
      "react": "@hot-loader/react",
      "react-dom": "@hot-loader/react-dom",
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: typeScriptRegex,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prod.json'
        }
      },
      {
        test: sassRegex, use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ],
  },
  optimization: {
    minimize: true,
  }
}