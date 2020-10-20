import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import * as cartActionTypes from '../../store/actions/cartActions';
import GenericButton from '../UI/Buttons/GenericButton/GenericButton';
import CartStatusInfo from './../Cart/CartStatusInfo/CartStatusInfo';
import GenericList from './../UI/GenericList/GenericList';
import CheckoutItem from './CheckoutItem/CheckoutItem';
import classes from './Checkout.module.scss';

const Checkout = (props) => {
	useEffect(() => {
		props.loadCartFromStorage();
	}, []);

	return (
		<Fragment>
			<div className={`${classes.checkoutContainer} utilBigContainer`}>
				<CartStatusInfo />
				<GenericList
					dataArray={props.prodsInCart}
					displayWith={CheckoutItem}
					additional={{ removeHandler: props.removeProdFromCart }}
				/>
				<GenericButton label='Confirm' status='inactive' />
			</div>
		</Fragment>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
