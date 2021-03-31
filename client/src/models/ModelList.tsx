import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
	AutocompleteInput,
	BooleanField,
	ChipField,
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
	ReferenceArrayField,
	SearchInput,
	SingleFieldList,
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
			<Datagrid optimized rowClick="edit">
				<TextField source="id" />
				<TextField source="name" />
				<ReferenceField source="type_id" reference="model_types" link={false}><TextField source="name" /></ReferenceField>
				<DateField source="created_at" sortByOrder="DESC" />
				<ReferenceArrayField
					label="Jobs"
					reference="jobs"
					source="jobs"
				>
					<SingleFieldList>
						<ChipField source="name" />
					</SingleFieldList>
				</ReferenceArrayField>
			</Datagrid>
		</Fragment>
	);
};

const ModelList: FC<any> = (props) => {
	useAuthenticated();
	return (
		<List
			{...props}
			filterDefaultValues={{}}
			sort={{ field: 'created_at', order: 'DESC' }}
			perPage={25}
			hasCreate={true}
		>
			<TabbedDatagrid />
		</List>
	);
};

export default ModelList;
