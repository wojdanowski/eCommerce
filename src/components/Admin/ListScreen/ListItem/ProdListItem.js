import React from 'react';

import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';
import ProdDescription from './../../../ListItems/ProdDescription/ProdDescription';

const ProdListItem = (props) => {
	const itemDataId = props.itemData[0];
	const itemData = props.itemData[1];
	let tools = null;
	let isRemoved;
	let isModified;

	if (props.additional) {
		tools = [
			{
				icon: <FiEye />,
				handler: () => props.additional.viewHandler(itemData),
			},
			{
				icon: <FiEdit />,
				handler: () =>
					props.additional.modifyHandler({
						...itemData,
						id: itemDataId,
					}),
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

		isRemoved = isPresent(itemDataId, props.additional.removedItems);

		isModified = isPresent(itemDataId, props.additional.modifiedItems);
	}

	return (
		<ListItem removed={isRemoved} edited={isModified} buttons={tools}>
			<ProdDescription itemData={{ ...itemData, id: itemDataId }} />
		</ListItem>
	);
};

export default ProdListItem;
