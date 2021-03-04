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
                <TextField label="Name" source="display_name" />
                <TextField label="E-mail" source="account.email" />
                <TextField label="Role" source="account.default_role" />
                <BooleanField label="MFA" source="account.mfa_enabled" />
            </Datagrid>
        </Fragment>
    );
};

const UserList: FC<any> = (props) => {
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

export default UserList;
