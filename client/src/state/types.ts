import type { ThemeName } from './theme/types';
//import type {Jobs} from './jobs/types';
import type { Users } from './users/types';

export interface ApplicationState {
	theme: ThemeName;
	//	jobs: Jobs;
	users: Users;
}
