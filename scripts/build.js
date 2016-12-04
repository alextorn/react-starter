const fse = require('fs-extra');
const paths = require('../config/paths');

process.env.NODE_ENV = 'production';

const copyPublicFolder = () => {
    fse.copy(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml
    });
};

fse.emptyDir(paths.appBuild + '/', (err) => {
	if(err) return console.error(err);
 
	console.log('Previous build deleted!');

	
});

copyPublicFolder();

