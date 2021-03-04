import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
	AutocompleteInput,
	BooleanField,
	Datagrid,
	DatagridProps,
	DateField,
	DateInput,
	Filter,
	FilterProps,
	Identifier,
	List,
	ListContextProvider,
	ListProps,
	NullableBooleanInput,
	NumberField,
	ReferenceInput,
	ReferenceField,
	SearchInput,
	TextField,
	TextInput,
	useGetList,
	useListContext,
	useAuthenticated,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useDatagridStyles = makeStyles({});

const TabbedDatagrid: FC<any> = (props) => {
	const listContext = useListContext();
	const { ids, filterValues, setFilters, displayedFilters } = listContext;
	const classes = useDatagridStyles();
	const isXSmall = useMediaQuery<Theme>((theme) =>
		theme.breakpoints.down('xs'),
	);

	return (
		<Fragment>
			<Datagrid>
				<TextField source="id" />
				<TextField source="name" />
				<ReferenceField source="admin_id" reference="users"><TextField source="display_name" /></ReferenceField>
			</Datagrid>
		</Fragment>
	);
};

const OrganizationList: FC<any> = (props) => {
	useAuthenticated();
	return (
		<List
			{...props}
			filterDefaultValues={{}}
			perPage={25}
		>
			<TabbedDatagrid />
		</List>
	);
};

export default OrganizationList;
