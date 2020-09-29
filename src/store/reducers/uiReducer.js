import * as actionTypes from '../actions/uiActions';

const initialState = {
	sidebars: {
		leftSidebarVisible: false,
		rightSidebarVisible: false,
	},
};

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_LEFT_SIDEBAR:
			return {
				...state,
				leftSidebarVisible: !state.leftSidebarVisible,
			};
		case actionTypes.TOGGLE_RIGHT_SIDEBAR:
			return {
				...state,
				rightSidebarVisible: !state.rightSidebarVisible,
			};

		default:
			return state;
	}
};

export default uiReducer;
