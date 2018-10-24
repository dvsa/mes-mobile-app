var dotenvConfig = require('dotenv-safe').config();
var _ = require('lodash');
const webpackConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const webpack = require('webpack');

const envConfigs = Object.keys(webpackConfig);

envConfigs.forEach(env => {
  webpackConfig[env].plugins.push(
    new webpack.DefinePlugin({
      'process.env': _(process.env)
        .pick(_.keys(dotenvConfig.parsed))
        .mapValues((v) => (JSON.stringify(v)))
        .value()
    })
  );
});
