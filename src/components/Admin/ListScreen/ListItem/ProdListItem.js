import React from 'react';

import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';
import ProdDescription from './../../../ListItems/ProdDescription/ProdDescription';

const ProdListItem = (props) => {
	const tools = [
		{
			icon: <FiEye />,
			handler: () => props.additional.viewHandler(props.itemData),
		},
		{
			icon: <FiEdit />,
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
			<ProdDescription itemData={props.itemData} />
		</ListItem>
	);
};

export default ProdListItem;
