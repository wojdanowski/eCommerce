import * as actionTypes from '../actions/authActions';

const initialState = {
	token: null,
	userId: null,
	isLoading: null,
};

const authReducer = (state = initialState, action) => {
	const saveStateToStorage = (localCart) => {
		localStorage.setItem('authInStorage', JSON.stringify(localCart));
	};

	switch (action.type) {
		case actionTypes.SET_IS_LOADING: {
			return {
				...state,
				isLoading: action.loading,
			};
		}
		case actionTypes.SET_USER_DATA: {
			console.log(`[authReducer]set user data`);
			return {
				...state,
				userId: action.userId,
				token: action.token,
			};
		}
		case 'test': {
			console.log(`reducer test action`);
			return {
				...state,
			};
		}
		default:
			return state;
	}
};

export default authReducer;
