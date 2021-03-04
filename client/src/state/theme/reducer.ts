import { Reducer } from 'redux';
import { CHANGE_THEME, changeTheme } from './actions';
import { ThemeName } from './types';

type State = ThemeName;
type Action =
	| ReturnType<typeof changeTheme>
	| { type: 'OTHER_ACTION'; payload?: any };

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState = isDark ? 'dark' : 'light';

const themeReducer: Reducer<State, Action> = (
	previousState = initialState,
	action,
) => {
	if (action.type === CHANGE_THEME) {
		return action.payload;
	}
	return previousState;
};

export default themeReducer;
