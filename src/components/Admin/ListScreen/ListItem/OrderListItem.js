import React from 'react';

import { FiTrash2, FiBox, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';
import OrderDescription from './OrderDescription';

const OrderListItem = (props) => {
	const itemDataId = props.itemData[0];
	const itemData = props.itemData[1];
	const tools = [
		{
			icon: <FiEye />,
			handler: () =>
				props.additional.viewHandler({ ...itemData, id: itemDataId }),
		},
		{
			icon: <FiBox />,
			handler: () =>
				props.additional.modifyHandler(
					{ ...itemData, id: itemDataId },
					'modify'
				),
		},
		{
			type: 'delete',
			icon: <FiTrash2 />,
			handler: () =>
				props.additional.modifyHandler(
					{ ...itemData, id: itemDataId },
					'remove'
				),
		},
	];

	const isRemoved = isPresent(itemDataId, props.additional.removedItems);

	const isModified = isPresent(itemDataId, props.additional.modifiedItems);

	return (
		<ListItem removed={isRemoved} edited={isModified} buttons={tools}>
			<OrderDescription
				itemData={itemData}
				itemId={itemDataId}
				edited={isModified}
			/>
		</ListItem>
	);
};

export default OrderListItem;
