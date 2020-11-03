import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as cartActionTypes from '../../store/actions/cartActions';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './Cart.module.scss';
import GenericButton from '../UI/Buttons/GenericButton/GenericButton';
import CartStatusInfo from './CartStatusInfo/CartStatusInfo';
import GenericList from '../UI/GenericList/GenericList';
import CartItem from '../ListItems/CartItem/CartItem';

const Cart = (props) => {
	let history = useHistory();
	const loadCartFromStorage = props.loadCartFromStorage;
	useEffect(() => {
		loadCartFromStorage();
	}, [loadCartFromStorage]);

	const checkoutClickedHandler = () => {
		props.toggleRightSidebar();
		history.push('/checkout');
	};

	let cartListContent = null;
	if (!props.cartIsEmpty) {
		cartListContent = (
			<Fragment>
				<GenericList
					dataArray={props.prodsInCart}
					displayWith={CartItem}
					additional={{ removeHandler: props.removeProdFromCart }}
				/>
				<GenericButton
					label='checkout'
					clicked={checkoutClickedHandler}
				/>
			</Fragment>
		);
	}

	return (
		<div className={classes.cartContainer}>
			<CartStatusInfo />
			{cartListContent}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		prodsInCart: state.cartState.products,
		cartIsEmpty: state.cartState.cartIsEmpty,
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
		toggleRightSidebar: () =>
			dispatch({ type: uiActionTypes.TOGGLE_RIGHT_SIDEBAR }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
