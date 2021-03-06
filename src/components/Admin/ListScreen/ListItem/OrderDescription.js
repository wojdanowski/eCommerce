import React, { Fragment } from 'react';
import classes from './OrderDescription.module.scss';

const OrderDescription = (props) => {
	const totalPrice = props.itemData.products
		.map((el) => el.price)
		.reduce((acc, cur) => acc + cur);

	const ifEdited = props.edited ? classes.edited : null;
	const confirmedStatus = props.itemData.processed ? (
		<span className={ifEdited}>YES</span>
	) : (
		<span className={ifEdited}>NO</span>
	);
	return (
		<Fragment>
			{props.itemId && (
				<p className={classes.idArea}>
					<strong>{props.itemId}</strong>
				</p>
			)}
			<p>Quantity: {props.itemData.products.length}</p>
			<p>Total Price: {parseFloat(totalPrice).toFixed(2)}</p>
			<p className={props.itemData.processed ? 'utilOnSuccess' : null}>
				Confirmed: {confirmedStatus}
			</p>
		</Fragment>
	);
};

export default OrderDescription;
