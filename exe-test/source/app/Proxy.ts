import * as jwt from 'jsonwebtoken';
import * as factory from 'http-proxy';

import { Logger, isEnv } from 'eca-framework/system';
import { Context, Middleware } from 'eca-framework/network';

import { Config } from './Config';
import { Service } from './Service';


export class Proxy {

    private readonly server = factory.createProxyServer();


    constructor(private readonly config: Config,
                private readonly logger: Logger,
                private readonly services: Map<string, Service>,) {
    }


    private async forward(context: Context) {

        for (const [name, service] of this.services) {
            for (const route of service.routes) {
                if (route.method === context.method && route.pathRx.test(context.path)) {
                    this.work(context, service);
                    return;
                }
            }
        }

        this.logger.info({
            method: context.method,
            path:   context.path,
            status: 404, // Not Found
        });

    }


    private work(context: Context, service: Service) {

        let user;

        const token = context.cookies.get('jwt');
        if (token) {
            try {
                user = jwt.verify(token, this.config.jwt.secret);
            } catch (error) {
                // Do nothing
            }
        }

        if (user) {
            // Do nothing
        } else if (this.allowAnon(context)) {
            user = { role: 'manager' };
        } else if (isEnv('stage', 'prod')) {
            // TODO SSO
            context.throw(401); // Unauthorized
        } else {
            const role = (user || { role: 'unknown' }).role;
            user = { role };
        }

        context.req.headers['auth-user'] = JSON.stringify(user);
        context.req.headers['correlation-id'] = generateId();
        context.respond = false;

        const { origin } = service;

        this.server.web(context.req, context.res, {
            target: `http://${ origin.host || 'localhost' }:${ origin.port }`,
        });

    }


    private allowAnon(context: Context) {
        // TODO
        const { path } = context;
        return path.startsWith('/session')
            || path.startsWith('/password-resets')
            || path.startsWith('/activations')
            || path.startsWith('/hol/parent/register');
    }


    middleware(): Middleware {
        return this.forward.bind(this);
    }

}


const SIZE = 2 ** 24;

function generateId() {

    const time = Date.now();
    const unix = (time / 1000) | 0;
    const tick = unix % SIZE;

    const base = Math.random();
    const rand = (base * SIZE) | 0;

    const uniq = toHex(tick, 6) + toHex(rand, 6);
    return '' +
        uniq.substr(0, 4) + '-' +
        uniq.substr(4, 4) + '-' +
        uniq.substr(8, 4);

}


function toHex(num: number, length: number) {
    const hex = num.toString(16);
    return '0'.repeat(length - hex.length) + hex;
}
