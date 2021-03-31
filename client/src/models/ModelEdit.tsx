import * as React from 'react';
import { FC } from 'react';
import {
	BooleanInput, Create,
	DateField,
	Edit,
	EditProps,
	FormWithRedirect,
	Labeled,
	ReferenceField, ReferenceInput, required, SectionTitle,
	SelectInput, SimpleForm,
	TextField, TextInput,
	Toolbar,
	useTranslate,
} from 'react-admin';
import {
	Card,
	CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Model } from '../types';

interface ModelTitleProps {
	record?: Model;
}

const ModelTitle: FC<ModelTitleProps> = ({ record }) => {
	const translate = useTranslate();
	return record ? (
		<span>
			{translate('resources.models.title', {
				reference: record.reference,
			})}
		</span>
	) : null;
};

const useEditStyles = makeStyles({
	root: { alignItems: 'flex-start' },
});

const ModelEdit: FC<any> = (props) => {
	const classes = useEditStyles();
	return (
		<Edit title={<ModelTitle />} classes={classes} {...props} component="div">
			<FormWithRedirect
				{...props}
				render={(formProps: any) => (
					<Card>
						<form>
							<CardContent>
								<TextInput
									autoFocus
									source="name"
									resource="models"
									validate={required()}
								/>
								<TextInput
									source="path"
									resource="models"
									validate={required()}
								/>
								<ReferenceInput
									label="Parent model"
									source="parent_model_id"
									reference="models"
									allowEmpty
								>
									<SelectInput source="id" />
								</ReferenceInput>
							</CardContent>
						</form>
					</Card>
				)}
			/>
		</Edit>
	);
};

export default ModelEdit;
