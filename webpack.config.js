/**
 * COMMON WEBPACK CONFIGURATION
 */
const target = process.env.npm_lifecycle_event;

var config;

switch(target) {
    case 'build':
        config = require('./config/webpack.config.prod.js')
        break;
    default:
        config = require('./config/webpack.config.dev.js')
        break;
}

module.exports = config;