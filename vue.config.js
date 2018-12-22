const serverConfig = require('./webpack.server.config');
const clientConfig = require('./webpack.client.config');
const webpackTarget = process.env.webpack_target == 'server';

module.exports = {
    configureWebpack: webpackTarget ? serverConfig : clientConfig
}