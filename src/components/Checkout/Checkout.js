import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

	let history = useHistory();
	return (
		<Fragment>
			<div className={`${classes.checkoutContainer} utilBigContainer`}>
				<CartStatusInfo />
				<GenericList
					dataArray={props.prodsInCart}
					displayWith={CheckoutItem}
					additional={{ removeHandler: props.removeProdFromCart }}
				/>
				{!props.cartIsEmpty ? (
					<GenericButton label='Confirm' />
				) : (
					<GenericButton
						label='back to products'
						clicked={() => history.push('/')}
					/>
				)}
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