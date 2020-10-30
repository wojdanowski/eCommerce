import React from 'react';

import { FiTrash2, FiBox, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';
import OrderDescription from './OrderDescription';

const OrderListItem = (props) => {
	const tools = [
		{
			icon: <FiEye />,
			handler: () => props.additional.viewHandler(props.itemData),
		},
		{
			icon: <FiBox />,
			handler: () =>
				props.additional.modifyHandler(props.itemData, 'modify'),
		},
		{
			type: 'delete',
			icon: <FiTrash2 />,
			handler: () =>
				props.additional.modifyHandler(props.itemData, 'remove'),
		},
	];

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
			<OrderDescription itemData={props.itemData} edited={isModified} />
		</ListItem>
	);
};

export default OrderListItem;
