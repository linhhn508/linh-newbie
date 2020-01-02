interface Origin {
	readonly host?: string;
	readonly port : number;
}


interface RouteData {
	readonly method: string;
	readonly path: string;
}


interface Request {
	readonly origin: Origin;
	readonly routes: RouteData[];
}


interface Route {
	readonly method: string;
	readonly pathRx: RegExp;
}


interface Service {
	readonly origin: Origin;
	readonly routes: Route[];
}


export { Request, Service }
