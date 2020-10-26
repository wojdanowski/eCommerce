import React from 'react';

import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import ProdDescription from './../../../ListItems/ProdDescription/ProdDescription';
import ListItem from './../ListItem/ListItem';

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

	return (
		<ListItem buttons={tools}>
			<ProdDescription itemData={props.itemData} />
		</ListItem>
	);
};

export default ProdListItem;
