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

const useEditStyles = makeStyles({
	root: { alignItems: 'flex-start' },
});

const ProfileForm: FC<any> = (props) => {
	return (
		<SimpleForm>
			<ReferenceInput
				label="User"
				source="userId"
				reference="users"
				validate={[required()]}
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
			<TextInput source="email" label="Email" validate={[required()]} />
		</SimpleForm>
	);
};

const ProfileEdit: FC<any> = (props) => {
	const classes = useEditStyles();
	const translate = useTranslate();
	return (
		<Edit
			title={translate('admin.profile.title')}
			classes={classes}
			{...props}
			component="div"
		>
			<ProfileForm />
		</Edit>
	);
};

export default ProfileEdit;
