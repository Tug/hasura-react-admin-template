import { Reducer } from 'redux';
import { Users } from './types';

type State = Users;
type Action = any;

const usersReducer: Reducer<State, Action> = (previousState = [], action) => {
	return previousState;
};

export default usersReducer;
