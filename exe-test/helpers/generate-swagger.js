'use strict';

const
	fs = require('fs'),
	path = require('path'),

	lodash = require('lodash'),
	parser = require('json-schema-ref-parser');


const DIST_PATH = path.join(__dirname, '..', 'dist');

const YAML_PATH = path.join(__dirname, 'swagger.yaml');
const JSON_PATH = path.join(DIST_PATH, 'swagger.json');


parser.dereference(YAML_PATH).then(function(swagger) {

	const { apiMap } = swagger;
	const paths = {};

	lodash.forIn(apiMap, service => {
		lodash.forIn(service, component => {
			lodash.merge(paths, component);
		});
	});

	delete swagger.apiMap;
	swagger.paths = paths;

	try {
		fs.mkdirSync(DIST_PATH);
	} catch (error) {
		if (error.code !== 'EEXIST') throw error;
	}

	const text = JSON.stringify(swagger, null, '\t');
	fs.writeFileSync(JSON_PATH, text);
	console.log('Written to', JSON_PATH);

}).catch(function(error) {
	console.error(error);
});
