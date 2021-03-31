import * as React from 'react';
import { FC } from 'react';
import {
	BooleanInput,
	DateField,
	Edit,
	EditProps,
	SimpleForm,
	ReferenceInput,
	SelectInput,
	TextInput,
	required,
	TextField,
	Toolbar,
	useGetIdentity,
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
import { paths } from '../routes';

const useEditStyles = makeStyles({
	root: { alignItems: 'flex-start' },
});

const ProfileEdit: FC<any> = ({ permissions, ...props }: { permissions: any, props: any }) => {
	const classes = useEditStyles();
	const translate = useTranslate();
	const { identity, loading: identityLoading } = useGetIdentity();
	if (identityLoading) {
		return null;
	}
	return (
		<Edit
			title={translate('admin.profile.title')}
			classes={classes}
			basePath={paths.ME}
			redirect={false}
			resource="users"
			id={identity.id}
			{...props}
		>
			<SimpleForm>
				<TextInput source="account.email" label="E-mail" disabled />
				<TextInput source="display_name" label="Name" />
			</SimpleForm>
		</Edit>
	);
};

export default ProfileEdit;
