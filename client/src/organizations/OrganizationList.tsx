import * as React from 'react';
import { FC, Fragment } from 'react';
import {
	ChipField,
	Datagrid,
	List,
	ReferenceManyField,
	ReferenceField,
	SingleFieldList,
	TextField,
	useListContext,
	useAuthenticated,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';

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
				<ReferenceField source="owner_id" reference="users" label="Owner">
					<TextField source="display_name" />
				</ReferenceField>
				<ReferenceManyField
					sort={{ field: 'created_at', order: 'DESC' }}
					perPage={10}
					label="Members"
					reference="users"
					target="organization_id"
				>
					<SingleFieldList>
						<ChipField source="display_name" />
					</SingleFieldList>
				</ReferenceManyField>
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
