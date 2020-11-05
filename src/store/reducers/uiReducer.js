import * as actionTypes from '../actions/uiActions';

const initialState = {
	sidebars: {
		leftSidebarVisible: false,
		rightSidebarVisible: false,
	},
	modalVisible: false,
	modalDisappeared: false,
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
					? true
					: state.modalDisappeared,
			};
		case actionTypes.SET_MODAL_DISAPPEARED:
			return {
				...state,
				modalDisappeared: state.modalVisible ? true : false,
			};

		default:
			return state;
	}
};

export default uiReducer;
