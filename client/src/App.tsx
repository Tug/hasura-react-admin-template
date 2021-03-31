import React, { useEffect, useState } from 'react';
import {Admin, Resource, TranslationProvider, ListGuesser, EditGuesser} from 'react-admin';
import { createBrowserHistory } from 'history';

import { authProvider, dataProviderFactory, i18nProvider } from './providers';
import { Layout, Login, Loading } from './layout';
import { Dashboard } from './dashboard';
import routes from './routes';
import { reducers } from './state';
import jobs from './jobs';
import models from './models';
import users from './users';
import organizations from './organizations';

const history = createBrowserHistory();

const App = () => {
	const [dataProvider, setDataProvider] = useState<any>();
	const [authenticated, setAuthenticated] = useState<boolean|null>(
		authProvider.isAuthenticated(),
	);

	useEffect(() => {
		authProvider.onAuthStateChanged(setAuthenticated);
	}, []);

	useEffect(() => {
		(async () => {
			// need to rebuild data provider so it can run the initial introspection query with auth
			const dp = await dataProviderFactory();
			setDataProvider(() => dp);
		})();
	}, [authenticated]);

	if (!dataProvider) {
		return (
			<TranslationProvider i18nProvider={i18nProvider}>
				<Loading />
			</TranslationProvider>
		);
	}

	return (
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
			i18nProvider={i18nProvider}
			customReducers={reducers}
			customRoutes={routes}
			layout={Layout}
			dashboard={Dashboard}
			loginPage={Login}
			history={history}
			disableTelemetry
		>
			<Resource name="models" {...models} />
			<Resource name="jobs" {...jobs} />
			<Resource name="users" {...users} />
			<Resource name="organizations" {...organizations} />
			<Resource name="job_types"/>
			<Resource name="job_status"/>
			<Resource name="model_types"/>
		</Admin>
	);
};

export default App;
