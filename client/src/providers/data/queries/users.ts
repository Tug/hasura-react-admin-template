import gql from 'graphql-tag';

export const userFragment = gql`
fragment User on users {
	__typename
	id
	updated_at
	organization_id
	display_name
	created_at
	avatar_url
}
`;

export const accountFragment = gql`
fragment Account on auth_accounts {
	__typename
	active
	mfa_enabled
	email
	created_at
	default_role
	account_roles {
		role
	}
}
`;

export const GET_USER = gql`
	{
		id
		updated_at
		organization_id
		display_name
		created_at
		avatar_url
		account {
			id
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

