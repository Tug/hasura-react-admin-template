import * as React from 'react';
import { FC } from 'react';
import {
	Create,
	FormTab,
	NumberInput,
	ReferenceInput,
	SelectInput,
	TabbedForm,
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
	const classes = useStyles();
	return (
		<Create {...props}>
			<TabbedForm>
				<FormTab label="resources.models.tabs.image">
					<TextInput
						autoFocus
						source="image"
						fullWidth
						validate={required()}
					/>
					<TextInput
						source="thumbnail"
						fullWidth
						validate={required()}
					/>
				</FormTab>
				<FormTab label="resources.models.tabs.details" path="details">
					<TextInput source="reference" validate={required()} />
					<NumberInput
						source="price"
						validate={required()}
						className={classes.price}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									€
								</InputAdornment>
							),
						}}
					/>
					<NumberInput
						source="width"
						validate={required()}
						className={classes.width}
						formClassName={classes.widthFormGroup}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									cm
								</InputAdornment>
							),
						}}
					/>
					<NumberInput
						source="height"
						validate={required()}
						className={classes.height}
						formClassName={classes.heightFormGroup}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									cm
								</InputAdornment>
							),
						}}
					/>
					<ReferenceInput
						source="category_id"
						reference="categories"
						allowEmpty
					>
						<SelectInput source="name" />
					</ReferenceInput>
					<NumberInput
						source="stock"
						validate={required()}
						className={classes.stock}
					/>
				</FormTab>
			</TabbedForm>
		</Create>
	);
};

export default ModelCreate;
