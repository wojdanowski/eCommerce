import * as actionTypes from '../actions/cartActions';
import isPresent from './../../utilities/isPresent';

const initialState = {
	products: [],
	totalPrice: 0,
	cartIsEmpty: true,
};

const cartReducer = (state = initialState, action) => {
	const saveStateToStorage = (localCart) => {
		localStorage.setItem('cartInStorage', JSON.stringify(localCart));
	};

	switch (action.type) {
		case actionTypes.ADD_ITEM_TO_CART: {
			if (!isPresent(action.product.id, state.products)) {
				const updatedArray = state.products.concat([action.product]);
				const newState = {
					...state,
					products: updatedArray,
					totalPrice: state.totalPrice * 1 + action.product.price * 1,
					cartIsEmpty: false,
				};
				saveStateToStorage(newState);
				alert('Added to cart');
				return {
					...newState,
				};
			} else return state;
		}

		case actionTypes.REM_ITEM_FROM_CART: {
			const updatedArray = state.products.filter(
				(product) => product.id !== action.product.id
			);
			let isCartEmpty = state.cartIsEmpty;
			updatedArray.length === 0 && (isCartEmpty = true);
			const newState = {
				...state,
				products: updatedArray,
				totalPrice: state.totalPrice - action.product.price,
				cartIsEmpty: isCartEmpty,
			};
			saveStateToStorage(newState);
			return {
				...newState,
			};
		}

		case actionTypes.CLEAR_CART: {
			const newState = {
				...initialState,
			};
			saveStateToStorage(newState);
			return {
				...newState,
			};
		}

		case actionTypes.LOAD_CART_FROM_STORAGE: {
			const cartInStorage = localStorage.getItem('cartInStorage');
			let newState = {};
			if (cartInStorage && !cartInStorage.cartIsEmpty) {
				newState = JSON.parse(cartInStorage);
			} else {
				newState = { ...initialState };
			}
			return {
				...newState,
			};
		}

		default:
			return state;
	}
};

export default cartReducer;
