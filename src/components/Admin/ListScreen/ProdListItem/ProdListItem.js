import React, { useState } from 'react';

import classes from './ProdListItem.module.scss';
import IconButton from '../../../UI/Buttons/IconButton/IconButton';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import ProdDescription from './../../../ListItems/ProdDescription/ProdDescription';
import ListItem from './../ListItem/ListItem';

const ProdListItem = (props) => {
	// const [isRemoved, setIsRemoved] = useState(false);
	// const removed = isRemoved ? classes.onRemove : null;
	// const appendClasses = [classes.itemContainer, removed];

	// const onRemove = () => {
	// 	console.log('onRemove');
	// 	// setIsRemoved((prevState) => !prevState);
	// 	props.additional.removeHandler(props.itemData);
	// };

	// const buttons = (
	// 	<div className={'utilToolbox'}>
	// 			<IconButton
	// 				clicked={props.additional.editHandler}
	// 				isDisabled={isRemoved}
	// 				icon={<FiEdit />}
	// 			/>
	// 			<IconButton
	// 				clicked={onRemove}
	// 				isRemoved={isRemoved}
	// 				icon={<FiTrash2 />}
	// 			/>
	// </div>
	// );

	const tools = [
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

		// <div className={appendClasses.join(' ')}>
		// <div className={'utilToolbox'}>
		// 	<IconButton
		// 		clicked={props.additional.editHandler}
		// 		isDisabled={isRemoved}
		// 		icon={<FiEdit />}
		// 	/>
		// 	<IconButton
		// 		clicked={onRemove}
		// 		isRemoved={isRemoved}
		// 		icon={<FiTrash2 />}
		// 	/>
		// </div>
		// </div>
	);
};

export default ProdListItem;
