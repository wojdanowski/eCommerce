import * as actionTypes from '../actions/authActions';

const initialState = {
	token: null,
	userId: null,
	isLoading: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IS_LOADING: {
			return {
				...state,
				isLoading: action.loading,
			};
		}
		case actionTypes.SET_USER_DATA: {
			return {
				...state,
				userId: action.userId,
				token: action.token,
			};
		}
		default:
			return state;
	}
};

export default authReducer;
