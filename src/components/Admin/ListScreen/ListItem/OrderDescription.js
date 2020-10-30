import React, { Fragment } from 'react';
import classes from './OrderDescription.module.scss';

const OrderDescription = (props) => {
	const { itemData } = props;

	const totalPrice = itemData.products
		.map((el) => el.price)
		.reduce((acc, cur) => acc + cur);

	const ifEdited = props.edited ? classes.edited : null;
	const confirmedStatus = itemData.processed ? (
		<span className={ifEdited}>YES</span>
	) : (
		<span className={ifEdited}>NO</span>
	);
	return (
		<Fragment>
			<p>
				<strong>{itemData.id}</strong>
			</p>
			<p>Quantity: {itemData.products.length}</p>
			<p>Total Price: {totalPrice}</p>
			<p className={itemData.processed ? 'utilOnSuccess' : null}>
				Confirmed: {confirmedStatus}
			</p>
		</Fragment>
	);
};

export default OrderDescription;
