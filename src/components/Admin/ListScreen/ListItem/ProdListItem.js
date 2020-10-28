import React from 'react';

import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import isPresent from './../../../../utilities/isPresent';
import ListItem from './ListItem';
import ProdDescription from './../../../ListItems/ProdDescription/ProdDescription';

const ProdListItem = (props) => {
	const tools = [
		{ icon: <FiEye />, handler: props.additional.viewHandler },
		{ icon: <FiEdit />, handler: props.additional.editHandler },
		{
			type: 'delete',
			icon: <FiTrash2 />,
			handler: () => props.additional.removeHandler(props.itemData),
		},
	];

	const isRemoved = isPresent(
		props.itemData.id,
		props.additional.removedItems
	);

	return (
		<ListItem removed={isRemoved} buttons={tools}>
			<ProdDescription itemData={props.itemData} />
		</ListItem>
	);
};

export default ProdListItem;
