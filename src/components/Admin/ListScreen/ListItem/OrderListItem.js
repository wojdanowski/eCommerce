import React from 'react';

import { FiTrash2, FiBox, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';

const OrderListItem = (props) => {
	const tools = [
		{ icon: <FiEye />, handler: props.additional.viewHandler },
		{
			icon: <FiBox />,
			handler: () => props.additional.modifyHandler(props.itemData),
		},
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

	const isModified = isPresent(
		props.itemData.id,
		props.additional.modifiedItems
	);

	return (
		<ListItem removed={isRemoved} edited={isModified} buttons={tools}>
			<p>Id: {props.itemData.id}</p>
			<p>Quantity: {props.itemData.products.length}</p>
			<p>Total Price: {totalPrice}</p>
			<p>Processed: {props.itemData.isProcessed}</p>
		</ListItem>
	);
};

export default OrderListItem;
