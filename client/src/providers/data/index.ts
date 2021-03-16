import buildHasuraProvider, { FetchType, ResourceType } from 'ra-data-hasura';
import customBuildFields from './custom-build-fields';
import { authGQLClientFactory, nhost } from '../shared';

let defaultDataProvider: Promise<any>;
let isAuthenticated: boolean | null = null;

export default function dataProviderFactory() {
	// rebuild data provider on auth change
	if (isAuthenticated !== nhost.auth.isAuthenticated()) {
		defaultDataProvider = buildHasuraProvider(
			{ client: authGQLClientFactory() },
			{ buildFields: customBuildFields },
		);
		isAuthenticated = nhost.auth.isAuthenticated();
	}
	return defaultDataProvider;
}
