import { AuthProvider, GET_ONE } from 'react-admin';
import dataProviderFactory from '../data';
import { nhost } from '../shared';
import { AuthChangedFunction } from "nhost-js-sdk/dist/Auth";

export class HBPAuth {
	private currentUser: any;

	constructor() {
		this.currentUser = null;
	}

	async login(params: { email: string; password: string }) {
		const { mfa, user } = await nhost.auth.login(params);
	}

	async logout() {
		this.currentUser = null;
		await nhost.auth.logout();
	}

	checkError(error: any): Promise<void> {
		if (error) {
			if (error.message.match(/field ".*" not found in type: '.*'/)) {
				console.log('Caught error from react-admin-graphql', error);
				return Promise.resolve();
			}
		}
		return Promise.reject(error);
	}

	checkAuth(params?: any): Promise<void> {
		if (nhost.auth.isAuthenticated() === null) { // nhost still loading
			return new Promise<void>((resolve, reject) => {
				const unsubscribe = nhost.auth.onAuthStateChanged((isAuthenticated: boolean) => {
					unsubscribe();
					if (!isAuthenticated) {
						reject(new Error('Unauthenticated'));
					} else {
						resolve();
					}
				});
			});
		}
		if (nhost.auth.isAuthenticated() === false) {
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
			await this.checkAuth();
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
		if (!nhost.auth.isAuthenticated()) {
			return [];
		}
		return nhost.auth.getClaim('x-hasura-allowed-roles');
	}

	getJWTToken() {
		if (!nhost.auth.isAuthenticated()) {
			return null;
		}
		return nhost.auth.getJWTToken();
	}

	getUserId() {
		if (!nhost.auth.isAuthenticated()) {
			return null;
		}
		return nhost.auth.getClaim('x-hasura-user-id');
	}

	isAuthenticated(): boolean|null {
		return nhost.auth.isAuthenticated();
	}

	onAuthStateChanged(fn: AuthChangedFunction): Function {
		return nhost.auth.onAuthStateChanged(fn);
	}
}
