import * as compose from 'koa-compose';

import { Logger } from 'eca-framework/system';

import { Config } from './Config';
import { Service } from './Service';

import { Registry } from './Registry';
import { Proxy } from './Proxy';


export class App {

	constructor(
		private readonly config: Config,
		private readonly logger: Logger,
	) {}


	middleware() {

		const { config, logger } = this;
		const services = new Map<string, Service>();

		return compose([
			new Registry(logger, services).middleware(),
			new Proxy(config, logger, services).middleware(),
		]);

	}

}
