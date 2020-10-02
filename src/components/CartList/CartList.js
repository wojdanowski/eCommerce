import React from 'react';
import classes from './CartList.module.scss';
import CartItem from './../CartList/CartItem/CartItem';
import Aux from './../../hoc/Auxiliary/Auxiliary';

const CartList = (props) => {
	return (
		<Aux>
			<CartItem />
			<CartItem />
			<CartItem />
		</Aux>
	);
};

export default CartList;
