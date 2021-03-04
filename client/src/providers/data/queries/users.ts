import gql from 'graphql-tag';

export const GET_USER = gql`
	{
		id
		updated_at
		organization_id
		display_name
		created_at
		avatar_url
		account {
			active
			mfa_enabled
			email
			created_at
			default_role
			account_roles {
				role
			}
		}
	}
`;
