import gql from 'graphql-tag';

export const GET_ORGANIZATION = gql`
	{
		owner_id
		id
		name,
		members {
			id
			display_name
		}
	}
`;
