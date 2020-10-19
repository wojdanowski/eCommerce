import React from 'react';
import { connect } from 'react-redux';

import classes from './CartList.module.scss';
import CartItem from './../CartItem/CartItem';
import * as cartActionTypes from '../../../store/actions/cartActions';

const CartList = (props) => {
	let listContent = props.prodsInCart.map((product) => (
		<CartItem
			key={product.id}
			prodData={product}
			removeHandler={props.removeProdFromCart}
		/>
	));

	return listContent;
};

const mapStateToProps = (state) => {
	return {
		prodsInCart: state.cartState.products,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeProdFromCart: (productData) =>
			dispatch({
				type: cartActionTypes.REM_ITEM_FROM_CART,
				product: productData,
			}),
		loadCartFromStorage: () =>
			dispatch({
				type: cartActionTypes.LOAD_CART_FROM_STORAGE,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
