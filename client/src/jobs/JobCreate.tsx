import * as React from 'react';
import {FC, useCallback, useEffect, useState} from 'react';
import {
	Create,
	FormWithRedirect,
	ReferenceInput,
	SaveButton,
	SelectInput,
	TextInput,
	required,
	useDataProvider,
	useGetIdentity,
	useNotify,
	useRedirect,
} from 'react-admin';
import { Box, Toolbar } from '@material-ui/core';
import Form from "@rjsf/material-ui";
import { get } from 'lodash';
import { JsonInput } from 'react-admin-json-view';

const JobCreate: FC = props => {
	const notify = useNotify();
	const redirect = useRedirect();
	const dataProvider = useDataProvider();
	const { identity, loading: identityLoading } = useGetIdentity();
	const [params, setParams] = useState<any>(null);
	const [selectedModelId, onModelChange] = useState<any>(null);
	const [selectedJobTypeId, onJobTypeChange] = useState<any>(null);
	const [selectedModel, setSelectedModel] = useState<any>(null);
	const [selectedJobType, setSelectedJobType] = useState<any>(null);
	const paramsSchema = get( selectedModel, `type.${selectedJobType}_params_schema`, null );

	useEffect(() => {
		if (!selectedModelId) {
			setSelectedModel(null);
			return;
		}
		dataProvider.getOne('models', { id: selectedModelId })
			.then(({ data }: any) => {
				setSelectedModel(data);
			})
			.catch((error: any) => {
				setSelectedModel(null);
			});
	}, [selectedModelId]);

	useEffect(() => {
		if (!selectedJobTypeId) {
			setSelectedJobType(null);
			return;
		}
		dataProvider.getOne('job_types', { id: selectedJobTypeId })
			.then(({ data }: any) => {
				setSelectedJobType(data.value);
			})
			.catch((error: any) => {
				setSelectedJobType(null);
			});
	}, [selectedJobTypeId]);

	const onSave = useCallback( (formData: any) => {
		dataProvider.create('jobs', {
			data: {
				...formData,
				creator_id: identity.id,
				params,
			}
		}).then(({ data }: any) => {
			notify('Job saved successfully'); // default message is 'ra.notification.updated'
			redirect('jobs');
		});
	}, [params]);

	return (
		<Create {...props}>
			<>
				<FormWithRedirect
					{...props}
					save={onSave}
					render={ (formProps: any) => (
						// here starts the custom form layout
						<Box p="1em" display={{ md: 'block', lg: 'flex' }} flexDirection="row">
							<Box flexGrow={1}>
								<form>
									<div>
										<TextInput source="name" />
									</div>
									<div>
										<ReferenceInput
											label="Model"
											source="model_id"
											reference="models"
											onChange={(event: any) => onModelChange(event.target.value)}
										>
											<SelectInput source="id" optionText="name" />
										</ReferenceInput>
									</div>
									<div>
										<ReferenceInput
											label="Type of run"
											source="type_id"
											reference="job_types"
											onChange={(event: any) => onJobTypeChange(event.target.value)}
										>
											<SelectInput source="id" optionText="value" />
										</ReferenceInput>
									</div>
									{ ! paramsSchema &&
										<JsonInput source="params" />
									}
									<Toolbar>
										<Box display="flex" justifyContent="space-between" width="100%">
											<SaveButton
												saving={formProps.saving}
												handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
											/>
										</Box>
									</Toolbar>
								</form>
							</Box>
							<Box maxWidth="40em">
								{ paramsSchema &&
									<Form
										schema={paramsSchema}
										formData={params}
										onChange={({formData}) => setParams(formData)}
									>
										<div></div>
									</Form>
								}
							</Box>
						</Box>
					)}
				/>
			</>
		</Create>
	);
};

export default JobCreate;
