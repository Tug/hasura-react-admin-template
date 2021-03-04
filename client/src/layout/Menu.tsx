import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import DefaultIcon from '@material-ui/icons/ViewList';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {useTranslate, DashboardMenuItem, MenuItemLink, getResources, usePermissions} from 'react-admin';

import { AppState } from '../types';

interface Props {
	dense: boolean;
	logout: () => void;
	onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
	const translate = useTranslate();
	const isXSmall = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('xs'),
	);
	const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
	useSelector((state: AppState) => state.theme); // force rerender on theme change
	const resources: any[] = useSelector(getResources);
	const { loaded: permissionsLoaded, permissions } = usePermissions();

	return (
		<Box mt={1}>
			{' '}
			<DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
			{resources.map(resource => {
				if (resource.name === 'users' && (!permissionsLoaded || (!permissions.includes('orgAdmin') && !permissions.includes('admin')))) {
					return null;
				}
				if (resource.name === 'organizations' && (!permissionsLoaded || (!permissions.includes('admin')))) {
					return null;
				}
				return (
					<MenuItemLink
						key={resource.name}
						to={`/${resource.name}`}
						primaryText={
							(resource.options && resource.options.label) ||
							translate(`admin.menu.${resource.name}`)
						}
						leftIcon={
							resource.icon ? <resource.icon /> : <DefaultIcon />
						}
						onClick={onMenuClick}
						sidebarIsOpen={open}
					/>
				);
			})}
			{isXSmall && (
				<MenuItemLink
					to="/configuration"
					primaryText={translate('admin.menu.configuration')}
					leftIcon={<SettingsIcon />}
					onClick={onMenuClick}
					sidebarIsOpen={open}
					dense={dense}
				/>
			)}
			{isXSmall && logout}
		</Box>
	);
};

export default Menu;
