import * as fs from 'fs';
import * as path from 'path';
import * as route from 'koa-route';
import * as path2re from 'path-to-regexp';

import { Logger } from 'eca-framework/system';
import { Context } from 'eca-framework/network';
import { json as parse } from 'co-body';
import { Request, Service } from './Service';


export class Registry {

	private readonly fileName: string;

	private readonly requests: {
		[name: string]: Request;
	};


	constructor(
		private readonly logger: Logger,
		private readonly services: Map<string, Service>,
	) {
		const { API_DATA_DIR, APP_ENV } = process.env;
		this.fileName = path.join(API_DATA_DIR, `services.${ APP_ENV }.json`);

		try {
			this.requests = readJson(this.fileName);
			for (const name in this.requests) {
				this.assign(name, this.requests[name]);
			}
		} catch (error) {
			if (error.code === 'ENOENT') {
				this.requests = Object.create(null);
			} else {
				throw error;
			}
		}
	}


	private async register(context: Context, name: string) {

		if (context.hostname !== 'localhost') {
			context.throw(403); // Forbidden
		}

		const data = await parse(context);
		this.logger.debug(data);

		this.requests[name] = data;
		writeJson(this.requests, this.fileName);

		this.assign(name, data);
		context.status = 204; // No Content

	}


	private assign(name: string, request: Request) {

		const routes = request.routes.map(item => ({
			method: item.method,
			pathRx: path2re(item.path),
		}));
		const origin = request.origin;

		this.services.set(name, { routes, origin });

	}


	middleware() {
		return route['put']('/services/:name', this.register.bind(this));
	}

}


function readJson(fileName: string) {
	const text = fs.readFileSync(fileName, 'utf8');
	return JSON.parse(text);
}


function writeJson(data: any, fileName: string) {
	const text = JSON.stringify(data, null, '\t');
	fs.writeFileSync(fileName, text);
}
