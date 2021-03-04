import * as React from 'react';
import { FC } from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    EditProps,
    FormWithRedirect,
    Labeled,
    required,
    ReferenceField,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    Toolbar,
    useTranslate,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//import { User } from '../types';

interface UserTitleProps {
    record?: any; //User;
}

const UserTitle: FC<UserTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
			{translate('resources.users.title', {
                reference: record.reference,
            })}
		</span>
    ) : null;
};

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const UserForm = (props: any) => {
    const translate = useTranslate();
    return (
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="display_name" label="Name" validate={[required()]} />
        </SimpleForm>
    );
};
const UserEdit: FC<any> = (props) => {
    const classes = useEditStyles();
    return (
        <Edit title={<UserTitle />} classes={classes} {...props} component="div">
            <UserForm />
        </Edit>
    );
};

export default UserEdit;
