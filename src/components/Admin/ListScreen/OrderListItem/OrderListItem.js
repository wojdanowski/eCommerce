import React from 'react';

import { FiTrash2, FiBox, FiEye } from 'react-icons/fi';
import ListItem from './../ListItem/ListItem';
import isPresent from './../../../../utilities/isPresent';

const OrderListItem = (props) => {
	const tools = [
		{ icon: <FiEye />, handler: props.additional.viewHandler },
		{ icon: <FiBox />, handler: props.additional.confirmHandler },
		{
			type: 'delete',
			icon: <FiTrash2 />,
			handler: () => props.additional.removeHandler(props.itemData),
		},
	];

	const totalPrice = props.itemData.products
		.map((el) => el.price)
		.reduce((acc, cur) => acc + cur);

	const isRemoved = isPresent(
		props.itemData.id,
		props.additional.removedItems
	);

	return (
		<ListItem removed={isRemoved} buttons={tools}>
			<p>Id: {props.itemData.id}</p>
			<p>Quantity: {props.itemData.products.length}</p>
			<p>Total Price: {totalPrice}</p>
			<p>Processed: {props.itemData.isProcessed}</p>
		</ListItem>
	);
};

export default OrderListItem;
