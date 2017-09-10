const _ = require('lodash');
const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV === 'prd' ? 'production' : 'development';
const root = `${__dirname}/../../`;
const paths = {
  assets: resolve(root, 'src/AppBundle/Resources/views/Assets/'),
  scripts: resolve(root, 'web/scripts/js'),
  context: resolve(root, 'src/AppBundle/Resources/scripts/js/'),
};

const manifestPlugin = (file, path) => ({
  apply: (compiler) => {
    compiler.plugin('done', (stats) => {
      fs.writeFileSync(
        resolve(path, file),
        JSON.stringify(
          _.mapValues(
            stats.toJson().assetsByChunkName,
            (chunk) => (env === 'development' ? chunk[0] : chunk)),
          null,
          '\t'
        )
      );
    });
  },
});

const config = {
  context: paths.context,
  entry: {
    /**
     * Contain all the vendors entries
     *
     * Vendors library (React, Lodash, ...)
     * Polyfills
     */
    vendor: [
      // Polyfills
      'core-js/es6/object',
      'core-js/es6/promise',
      'whatwg-fetch',

      // Vendors
      'lodash/isEqual',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
    ],
    /**
     * Each of the following entries represent the single entrypoints
     * for a given page type
     */
    home: [
      'entrypoints/latest_news_home.jsx',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!o-.*)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', ['es2015', { modules: false }]],
        },
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.scripts,
  },
  performance: {
    hints: env === 'production' ? 'warning' : false,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'inlined'],
      minChunks: Infinity,
    }),
    new CleanWebpackPlugin(['**'], {
      root: paths.scripts,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    manifestPlugin('manifest.json', resolve(root, 'var/webpack/')),
  ],
  resolve: {
    alias: {
      actions: 'react/actions',
      components: 'react/components',
      containers: 'react/containers',
      helpers: 'helpers',
      lib: 'lib',
      reducers: 'react/reducers',
      store: 'react/store',
    },
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      './src/AppBundle/Resources/scripts/js',
    ],
  },
  target: 'web',
};

if (env === 'production') {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  );
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        negate_iife: true,
        unused: true,
        dead_code: true,
        drop_console: true,
        warnings: false,
      },
      output: { comments: false },
    })
  );
}

module.exports = config;
