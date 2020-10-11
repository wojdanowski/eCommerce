import * as actionTypes from '../actions/cartActions';

const initialState = {
	products: [],
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ITEM_TO_CART:
			return {
				...state,
				products: state.products.concat([action.product]),
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
