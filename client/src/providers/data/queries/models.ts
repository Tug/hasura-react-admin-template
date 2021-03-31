import gql from 'graphql-tag';

export const GET_MODEL = gql`
	{
		id
		name
		path
		created_at
		parent_model_id
		type {
			id
			name
			generate_params_schema
			train_params_schema
			evaluate_params_schema
		}
	}
`;
