import * as actionTypes from '../actions/uiActions';

const initialState = {
	sidebars: {
		leftSidebarVisible: false,
		rightSidebarVisible: false,
	},
	modalVisible: false,
	modalDisappeared: true,
};

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_LEFT_SIDEBAR:
			return {
				...state,
				sidebars: {
					...state.sidebars,
					leftSidebarVisible: !state.sidebars.leftSidebarVisible,
				},
			};
		case actionTypes.TOGGLE_RIGHT_SIDEBAR:
			return {
				...state,
				sidebars: {
					...state.sidebars,
					rightSidebarVisible: !state.sidebars.rightSidebarVisible,
				},
			};
		case actionTypes.TOGGLE_MODAL:
			return {
				...state,
				modalVisible: !state.modalVisible,
				modalDisappeared: !state.modalVisible
					? false
					: state.modalDisappeared,
			};
		case actionTypes.SET_MODAL_DISAPPEARED:
			return {
				...state,
				modalDisappeared: state.modalVisible ? false : true,
			};

		default:
			return state;
	}
};

export default uiReducer;
