import * as actionTypes from '../actions/uiActions';

const initialState = {
	sidebars: {
		leftSidebarVisible: false,
		rightSidebarVisible: false,
	},
	modalVisible: false,
};

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_LEFT_SIDEBAR:
			console.log('toggle LEFT sidebar from redux');
			return {
				...state,
				sidebars: {
					...state.sidebars,
					leftSidebarVisible: !state.sidebars.leftSidebarVisible,
				},
			};
		case actionTypes.TOGGLE_RIGHT_SIDEBAR:
			console.log('toggle RIGHT sidebar from redux');
			return {
				...state,
				sidebars: {
					...state.sidebars,
					rightSidebarVisible: !state.sidebars.rightSidebarVisible,
				},
			};
		case actionTypes.TOGGLE_MODAL:
			console.log('toggle MODAL from redux');
			return {
				...state,
				modalVisible: !state.modalVisible,
				sidebars: {
					...state.sidebars,
				},
			};

		default:
			console.log(`Default State`);
			return state;
	}
};

export default uiReducer;
