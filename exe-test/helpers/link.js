'use strict';

const
	fs = require('fs'),
	path = require('path');

const DIST_PATH = path.join(__dirname, '..', 'dist');

try {
	fs.mkdirSync(DIST_PATH);
} catch (error) {
	if (error.code !== 'EEXIST') throw error;
}

try {
	fs.symlinkSync(
		path.join(DIST_PATH, 'source'),
		path.join(DIST_PATH, 'node_modules'),
		'junction'
	);
} catch (error) {
	if (error.code !== 'EEXIST') throw error;
}
