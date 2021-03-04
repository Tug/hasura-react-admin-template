import React from 'react';
import { Route } from 'react-router-dom';

import Configuration from './configuration/Configuration';
import Me from './profile/Me';

export const paths = {
	ROOT: '/',
	LOGIN: '/login',
	LOGOUT: '/logout',
	CONFIGURATION: '/configuration',
	ME: '/me',
};

export default [
	<Route path={paths.CONFIGURATION} component={Configuration} />,
	<Route path={paths.ME} component={Me} />,
];
