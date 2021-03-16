import {
	from,
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Config } from './config';
import nhost from './nhost-client';

export const XHasuraClientName = 'hasura-client-name';

const getAuthToken = (): string | null => nhost.auth.getJWTToken();

const authHeaders: any = (token: string | undefined) => {
	if (!token) {
		return {};
	}
	return {
		Authorization: `Bearer ${token}`,
	};
};

const authLink = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers }: { headers: any }) => {
		return {
			headers: {
				...headers,
				...authHeaders(nhost.auth.getJWTToken()),
			},
		};
	});

	return forward(operation);
});

const splitLink = (http: ApolloLink, ws: WebSocketLink): ApolloLink =>
	split(
		// split based on operation type
		({ query }) => {
			const { kind, operation } = getMainDefinition(
				query,
			) as OperationDefinitionNode;

			return (
				kind === 'OperationDefinition' && operation === 'subscription'
			);
		},
		ws,
		http,
	);

const httpLink = from([
	authLink,
	// errorLink,
	new HttpLink({
		uri: Config.httpDataHost,
		headers: {
			[XHasuraClientName]: Config.hasuraClientName,
		},
	}),
]);

const wsLink = new WebSocketLink({
	uri: Config.wsDataHost,
	options: {
		reconnect: true,
		connectionParams: () => ({
			headers: {
				Authorization: getAuthToken(),
				[XHasuraClientName]: Config.hasuraClientName,
			},
		}),
		lazy: true,
		connectionCallback: (error: Error[]) => {
			console.error('connection error: ', error);
		},
	},
});

const commonApolloOptions = {
	version: Config.version,
};

export const authGQLClientFactory = () =>
	new ApolloClient({
		cache: new InMemoryCache(),
		link: splitLink(httpLink, wsLink),
		...commonApolloOptions,
	});

export const gqlClientFactory = () =>
	new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: Config.httpDataHost,
		}),
		...commonApolloOptions,
	});
