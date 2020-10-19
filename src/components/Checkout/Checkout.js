import React, { Fragment } from 'react';
import CartList from './../Cart/CartList/CartList';
import CartStatusInfo from './../Cart/CartStatusInfo/CartStatusInfo';

const Checkout = () => {
	return (
		<Fragment>
			<CartStatusInfo />
			<CartList />
		</Fragment>
	);
};

export default Checkout;
