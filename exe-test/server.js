'use strict';

require('reflect-metadata');
require('eca-framework/typescript');

const path = require('path');
const { API_DATA_DIR, APP_ENV } = process.env;
const configFile = path.join(API_DATA_DIR, 'config.' + APP_ENV);

const
	config = require(configFile),
	source = require('./dist/node_modules');

config.source = {
	path: path.join(__dirname, 'source'),
};

source.start(config).then(listen, handler);

function listen({ koa, logger }) {
	const server = koa.listen(config.listen);
	server.on('listening', function() {
		logger.info(server.address());
	});
	server.on('error', handler);
}

function handler(error) {
	console.error(error.stack);
	process.exitCode = 1;
}
