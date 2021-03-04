import * as React from 'react';
import { FC } from 'react';
import {
	BooleanInput,
	DateField,
	Edit,
	EditProps,
	FormWithRedirect,
	Labeled,
	ReferenceField,
	SelectInput,
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

import { Job } from '../types';

interface JobTitleProps {
	record?: Job;
}

const JobTitle: FC<JobTitleProps> = ({ record }) => {
	const translate = useTranslate();
	return record ? (
		<span>
			{translate('resources.jobs.title', {
				reference: record.reference,
			})}
		</span>
	) : null;
};

const useEditStyles = makeStyles({
	root: { alignItems: 'flex-start' },
});

const JobForm = (props: any) => {
	const translate = useTranslate();
	return (
		<FormWithRedirect
			{...props}
			render={(formProps: any) => (
				<Box maxWidth="50em">
					<Card>
						<CardContent>
							<Grid container spacing={1}></Grid>
						</CardContent>
					</Card>
				</Box>
			)}
		/>
	);
};
const JobEdit: FC<any> = (props) => {
	const classes = useEditStyles();
	return (
		<Edit title={<JobTitle />} classes={classes} {...props} component="div">
			<JobForm />
		</Edit>
	);
};

export default JobEdit;
