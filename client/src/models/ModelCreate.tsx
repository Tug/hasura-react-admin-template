import * as React from 'react';
import { FC } from 'react';
import {
	Create,
	NumberInput,
	ReferenceInput,
	SectionTitle,
	SelectInput,
	SimpleForm,
	TextInput,
	required,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
	price: { width: '7em' },
	width: { width: '7em' },
	height: { width: '7em' },
	stock: { width: '7em' },
	widthFormGroup: { display: 'inline-block' },
	heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const ModelCreate: FC = props => {
	const classes = useStyles(props);
	return (
		<Create {...props}>
			<SimpleForm>
				<ReferenceInput
					label="Model type"
					source="type_id"
					reference="model_types"
				>
					<SelectInput source="id" />
				</ReferenceInput>
				<TextInput
					autoFocus
					source="name"
					validate={required()}
				/>
				<TextInput
					source="path"
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
			</SimpleForm>
		</Create>
	);
};

export default ModelCreate;
