import React from 'react';
import { connect } from 'react-redux';

import classes from './CartStatusInfo.module.scss';

const CartStatusInfo = (props) => {
	let info;

	if (props.cartIsEmpty) {
		info = <h1>Your Cart is Empty</h1>;
	} else {
		info = (
			<div className={`${classes.cartHead}`}>
				<h1>Your Cart</h1>
				<h1>Total: {props.totalPrice}$</h1>
			</div>
		);
	}

	return info;
};

const mapStateToProps = (state) => {
	return {
		totalPrice: state.cartState.totalPrice,
		cartIsEmpty: state.cartState.cartIsEmpty,
	};
};

export default connect(mapStateToProps)(CartStatusInfo);
