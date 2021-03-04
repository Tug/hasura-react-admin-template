import React, { useEffect, useState } from 'react';
import {Admin, Resource, TranslationProvider, Loading, ListGuesser, EditGuesser} from 'react-admin';
import { createBrowserHistory } from 'history';

import { authProvider, dataProviderFactory, i18nProvider } from './providers';
import { Layout, Login } from './layout';
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
	const [authenticated, setAuthenticated] = useState<boolean>(
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
			<Resource
				name="models"
				list={models.list}
				edit={models.edit}
				create={models.create}
				icon={models.icon}
			/>
			<Resource
				name="jobs"
				list={jobs.list}
				edit={jobs.edit}
				create={jobs.create}
				icon={jobs.icon}
			/>
			<Resource
				name="users"
				list={users.list}
				edit={users.edit}
				create={users.create}
				icon={users.icon}
			/>
			<Resource
				name="organizations"
				list={organizations.list}
				edit={organizations.edit}
				icon={organizations.icon}
			/>
		</Admin>
	);
};

export default App;
