import { ReduxState, Record, Identifier } from 'ra-core';
import { ThemeName } from './state/theme/types';

export interface AppState extends ReduxState {
	theme: ThemeName;
}

export interface Job extends Record {
	id: number;
	created_at: Date;
	started_at: Date;
	ended_at: Date;
	name: String;
	model: number;
	params: any;
	status: number;
	type: number;
	date: Date;
	total: number;
}
