import buildHasuraProvider, { FetchType, ResourceType } from 'ra-data-hasura';
import customBuildFields from './custom-build-fields';
import { authGQLClientFactory, nhostAuthClient } from '../shared';

let defaultDataProvider: Promise<any>;
let isAuthenticated: boolean | null = null;

export default function dataProviderFactory() {
	// rebuild data provider on auth change
	if (isAuthenticated !== nhostAuthClient.isAuthenticated()) {
		defaultDataProvider = buildHasuraProvider(
			{ client: authGQLClientFactory() },
			{ buildFields: customBuildFields },
		);
		isAuthenticated = nhostAuthClient.isAuthenticated();
	}
	return defaultDataProvider;
}
