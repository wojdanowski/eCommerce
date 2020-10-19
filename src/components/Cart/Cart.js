import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as cartActionTypes from '../../store/actions/cartActions';
import classes from './Cart.module.scss';
import GenericButton from '../UI/Buttons/GenericButton/GenericButton';
import CartList from './CartList/CartList';

const Cart = (props) => {
	useEffect(() => {
		props.loadCartFromStorage();
	}, []);

	let cartListContent = null;
	if (props.prodsInCart.length) {
		cartListContent = (
			<Fragment>
				<div className={`${classes.cartHead} utilContainer`}>
					<h1>Your Cart</h1>
					<h1>Total: {props.totalPrice}$</h1>
				</div>
				<CartList />
				<GenericButton label='checkout' />
			</Fragment>
		);
	} else {
		cartListContent = <h1>Your Cart is Empty</h1>;
	}

	return <div className={classes.cartContainer}>{cartListContent}</div>;
};

const mapStateToProps = (state) => {
	return {
		prodsInCart: state.cartState.products,
		totalPrice: state.cartState.totalPrice,
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
