import * as actionTypes from '../actions/cartActions';

const initialState = {
	products: [],
};

const cartReducer = (state = initialState, action) => {
	const isPresent = (id) => {
		const found = state.products.find((element) => element.id === id);
		return found ? true : false;
	};

	switch (action.type) {
		case actionTypes.ADD_ITEM_TO_CART:
			if (!isPresent(action.product.id)) {
				console.log('adding');
				const updatedArray = state.products.concat([action.product]);
				return {
					...state,
					products: updatedArray,
				};
			} else return state;

		case actionTypes.REM_ITEM_FROM_CART:
			const updatedArray = state.products.filter(
				(product) => product.id !== action.product.id
			);
			return {
				...state,
				products: updatedArray,
			};
		default:
			return state;
	}
};

export default cartReducer;
