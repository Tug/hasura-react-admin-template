import React from 'react';
import {useSelector} from 'react-redux';
import {Layout, useTranslate} from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import Sidebar from './Sidebar';
import { dark as darkTheme, light as lightTheme } from './themes';
import { AppState } from '../types';

export default (props: any) => {
	const theme = useSelector((state: AppState) =>
		state.theme === 'dark' ? darkTheme : lightTheme,
	);
	const translate = useTranslate();

	return (
		<Layout
			{...props}
			title={translate("admin.app.name")}
			appBar={AppBar}
			sidebar={Sidebar}
			menu={Menu}
			theme={theme}
		/>
	);
};
