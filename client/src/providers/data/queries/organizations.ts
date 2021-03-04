import gql from 'graphql-tag';

export const GET_ORGANIZATION = gql`
	{
		admin_id
		id
		name
	}
`;
