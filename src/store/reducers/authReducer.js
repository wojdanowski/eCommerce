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
		case actionTypes.LOAD_USER_DATA_FROM_STORAGE: {
			const tokenInStorage = localStorage.getItem('token');
			const expirationDateInStorage = localStorage.getItem(
				'expirationDate'
			);

			const userIdInStorage = localStorage.getItem('userId');
			let newState = {
				...state,
			};
			if (Date.parse(expirationDateInStorage) < new Date()) {
				newState = {
					...state,
					token: null,
					userId: null,
				};
			} else if (
				tokenInStorage &&
				expirationDateInStorage &&
				userIdInStorage
			) {
				newState = {
					...state,
					token: tokenInStorage,
					userId: userIdInStorage,
				};
			} else
				newState = {
					...state,
					token: null,
					userId: null,
				};

			return {
				...newState,
			};
		}
		default:
			return state;
	}
};

export default authReducer;
