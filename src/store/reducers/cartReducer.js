import * as actionTypes from '../actions/cartActions';

const initialState = {
	products: [],
	totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
	const isPresent = (id) => {
		const found = state.products.find((element) => element.id === id);
		return found ? true : false;
	};

	const saveStateToStorage = (localCart) => {
		localStorage.setItem('cartInStorage', JSON.stringify(localCart));
	};

	switch (action.type) {
		case actionTypes.ADD_ITEM_TO_CART:
			if (!isPresent(action.product.id)) {
				const updatedArray = state.products.concat([action.product]);
				const newState = {
					...state,
					products: updatedArray,
					totalPrice: state.totalPrice + action.product.price,
				};
				saveStateToStorage(newState);
				return {
					...newState,
				};
			} else return state;

		case actionTypes.REM_ITEM_FROM_CART:
			const updatedArray = state.products.filter(
				(product) => product.id !== action.product.id
			);
			const newState = {
				...state,
				products: updatedArray,
				totalPrice: state.totalPrice - action.product.price,
			};
			saveStateToStorage(newState);
			return {
				...newState,
			};
		case actionTypes.LOAD_CART_FROM_STORAGE:
			const cartInStorage = localStorage.getItem('cartInStorage');
			if (cartInStorage) {
				const newState = JSON.parse(cartInStorage);
				return {
					...newState,
				};
			} else return state;
		default:
			return state;
	}
};

export default cartReducer;
