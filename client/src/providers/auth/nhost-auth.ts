import { AuthProvider, GET_ONE } from 'react-admin';
import dataProviderFactory from '../data';
import { Config, nhostAuthClient } from '../shared';

export class HBPAuth {
	private currentUser: any;
	private fetchingUser: Promise<any> | null;

	constructor() {
		this.currentUser = null;
		this.fetchingUser = null;
	}

	async login(params: { email: string; password: string }) {
		const mfaData = await nhostAuthClient.login(params.email, params.password);
	}

	logout() {
		this.currentUser = null;
		return nhostAuthClient.logout();
	}

	checkError(error: any): Promise<void> {
		if (error) {
			if (error.message.match(/field ".*" not found in type: '.*'/)) {
				console.log('Caught error from react-admin-graphql', error);
				return Promise.resolve();
			}
			return Promise.reject(error);
		}
		return Promise.resolve();
	}

	checkAuth(params?: any): Promise<void> {
		if (!this.isAuthenticated()) {
			return Promise.reject(new Error('Unauthenticated'));
		}
		return Promise.resolve();
	}

	private async getUserData(): Promise<any> {
		if (this.currentUser) {
			return this.currentUser;
		}
		try {
			const dataProvider = await dataProviderFactory();
			const response = await dataProvider(GET_ONE, 'users', {
				id: this.getUserId(),
			});
			this.currentUser = response.data;
		} catch(e) {
			console.log('defaultDataProvider threw an error', e);
		}
		return this.currentUser;
	}

	async getIdentity(): Promise<any> {
		try {
			this.checkAuth();
			const {
				id,
				display_name,
				account: {
					active,
					email,
					default_role,
					account_roles,
					mfa_enabled,
				},
			} = await this.getUserData();
			const identity = {
				id,
				active,
				mfa_enabled,
				email,
				fullName: display_name,
				roles: (account_roles || []).map(
					(ac: { role: string }) => ac.role,
				),
			};
			return identity;
		} catch (err) {
			return null;
		}
	}

	async getPermissions(params: any) {
		if (!nhostAuthClient.isAuthenticated()) {
			return [];
		}
		return nhostAuthClient.getClaim('x-hasura-allowed-roles');
	}

	getJWTToken() {
		if (!nhostAuthClient.isAuthenticated()) {
			return null;
		}
		return nhostAuthClient.getJWTToken();
	}

	getUserId() {
		if (!nhostAuthClient.isAuthenticated()) {
			return null;
		}
		return nhostAuthClient.getClaim('x-hasura-user-id');
	}

	isAuthenticated(): boolean {
		return !!nhostAuthClient.isAuthenticated();
	}

	onAuthStateChanged(fn: Function): Function {
		return (nhostAuthClient.onAuthStateChanged(fn) as unknown) as Function;
	}
}
