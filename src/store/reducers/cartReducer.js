import * as actionTypes from '../actions/cartActions';

const initialState = {};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ITEM_TO_CART:
			console.log(`add item to cart`);
			return {
				...state,
			};
		case actionTypes.REM_ITEM_FROM_CART:
			console.log(`rem item from cart`);
			return {
				...state,
			};
		default:
			return state;
	}
};

export default cartReducer;
