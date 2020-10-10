import React from 'react';
import classes from './CartList.module.scss';
import CartItem from './../CartList/CartItem/CartItem';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';

const CartList = (props) => {
	return (
		<div className={classes.cartContainer}>
			<div className={`${classes.cartHead} utilContainer`}>
				<h1>Your Cart</h1>
				<h1>Total: 100$</h1>
			</div>
			<div className={classes.items}>
				<div className={classes.item}>
					<CartItem />
				</div>
				<div className={classes.item}>
					<CartItem />
				</div>
				<div className={classes.item}>
					<CartItem />
				</div>
				<div className={classes.item}>
					<CartItem />
				</div>
				<div className={classes.item}>
					<CartItem />
				</div>
			</div>
			<GenericButton label='checkout' />
		</div>
	);
};

export default CartList;
