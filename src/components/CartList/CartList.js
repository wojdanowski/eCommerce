import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as cartActionTypes from '../../store/actions/cartActions';
import classes from './CartList.module.scss';
import CartItem from './../CartList/CartItem/CartItem';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';

const CartList = (props) => {
	let cartListContent = null;
	if (props.prodsInCart.length) {
		cartListContent = (
			<Fragment>
				<div className={`${classes.cartHead} utilContainer`}>
					<h1>Your Cart</h1>
					<h1>Total: {props.totalPrice}$</h1>
				</div>
				<div className={classes.items}>
					{props.prodsInCart.map((product) => (
						<div key={product.id} className={classes.item}>
							<CartItem
								prodData={product}
								removeHandler={props.removeProdFromCart}
							/>
						</div>
					))}
				</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
