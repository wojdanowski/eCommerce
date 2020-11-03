import React from 'react';

import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';
import ProdDescription from './../../../ListItems/ProdDescription/ProdDescription';

const ProdListItem = (props) => {
	let tools = null;
	let isRemoved;
	let isModified;

	if (props.additional) {
		tools = [
			{
				icon: <FiEye />,
				handler: () => props.additional.viewHandler(props.itemData),
			},
			{
				icon: <FiEdit />,
				handler: () => props.additional.modifyHandler(props.itemData),
			},
			{
				type: 'delete',
				icon: <FiTrash2 />,
				handler: () =>
					props.additional.modifyHandler(props.itemData, 'remove'),
			},
		];

		isRemoved = isPresent(props.itemData.id, props.additional.removedItems);

		isModified = isPresent(
			props.itemData.id,
			props.additional.modifiedItems
		);
	}

	return (
		<ListItem removed={isRemoved} edited={isModified} buttons={tools}>
			<ProdDescription itemData={props.itemData} />
		</ListItem>
	);
};

export default ProdListItem;
