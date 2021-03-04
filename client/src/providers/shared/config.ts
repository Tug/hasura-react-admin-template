function assertEnv(value: string | undefined, key: string): string {
	if (!value) {
		throw new Error(`Environment ${key} doesn't exist`);
	}

	return value;
}

const NHOST_URI = assertEnv(
	process.env.REACT_APP_NHOST_URI,
	'REACT_APP_NHOST_URI',
);
const GRAPHQL_URI = assertEnv(
	process.env.REACT_APP_GRAPHQL_URI,
	'REACT_APP_NHOST_URI',
);
const GRAPHQL_PARSED_URL = new URL(GRAPHQL_URI);
const WS_SCHEME = GRAPHQL_PARSED_URL.protocol === 'https' ? 'wss' : 'ws';
GRAPHQL_PARSED_URL.protocol = WS_SCHEME;

export const Config = {
	httpDataHost: GRAPHQL_URI,
	wsDataHost: GRAPHQL_PARSED_URL.href,
	nHost: NHOST_URI,
	version: process.env.VERSION || '1.0.0',
	debug: process.env.NODE_ENV !== 'production',
	hasuraClientName: 'hasura-web-client-1.0',
	sessionToken: 'jwt_token',
};
