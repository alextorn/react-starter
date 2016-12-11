const path = require('path');

module.exports = {
	appSrc: path.join(__dirname, '../app'),
	appIndexJs: path.join(__dirname, '../app/index.js'),
	appStyle: path.join(__dirname, '../app/assets/style/main.scss'),
	appPublic: path.join(__dirname, '../public'),
	appHTML: path.join(__dirname, '../public/index.html'),
	appBuild: path.join(__dirname, '../build'),
	nodePaths: (process.env.NODE_PATH || '')
};

