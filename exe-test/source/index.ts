import { JsonLogger, TextLogger, isEnv } from 'eca-framework/system';
import { Koa } from 'eca-framework/network';

import { App } from './app/App';


export async function start(config) {

	const logger = isEnv('local', 'test')
		? new TextLogger()
		: new JsonLogger();

	const app = new App(config, logger).middleware();

	const koa = new Koa();
	koa.proxy = true;

	koa.use(app);

	return { koa, logger };

}
