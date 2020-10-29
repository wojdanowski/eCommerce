import React, { Fragment } from 'react';

const OrderDescription = (props) => {
	const { itemData } = props;

	const totalPrice = itemData.products
		.map((el) => el.price)
		.reduce((acc, cur) => acc + cur);

	return (
		<Fragment>
			<p>{itemData.id}</p>
			<p>Quantity: {itemData.products.length}</p>
			<p>Total Price: {totalPrice}</p>
			<p>Processed: {itemData.isProcessed}</p>
		</Fragment>
	);
};

export default OrderDescription;
