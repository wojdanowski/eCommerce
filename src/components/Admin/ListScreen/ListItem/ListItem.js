import React, { useState } from 'react';

import classes from './ListItem.module.scss';
import IconButton from '../../../UI/Buttons/IconButton/IconButton';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const ListItem = (props) => {
	const [isRemoved, setIsRemoved] = useState(false);
	const removed = isRemoved ? classes.onRemove : null;
	const appendClasses = [classes.itemContainer, removed];

	const onRemove = () => {
		console.log('onRemove');
		setIsRemoved((prevState) => !prevState);
		// props.additional.removeHandler(props.itemData);
	};

	return (
		<div className={appendClasses.join(' ')}>
			{props.children}
			<div className={'utilToolbox'}>
				{props.buttons.map((button, index) => {
					let disabledStatus = isRemoved;
					let buttonHandler = () => {
						button.handler();
					};
					if (button.type === 'delete') {
						buttonHandler = () => {
							onRemove();
							button.handler();
						};
						disabledStatus = null;
					}

					return (
						<IconButton
							key={index}
							icon={button.icon}
							clicked={buttonHandler}
							isDisabled={disabledStatus}
							isRemoved={isRemoved}
						/>
					);
				})}
			</div>

			{/* <div className={classes.toolbox}>
				<IconButton
					clicked={props.additional.editHandler}
					isDisabled={isRemoved}
					icon={<FiEdit />}
				/>
				<IconButton
					clicked={onRemove}
					isRemoved={isRemoved}
					icon={<FiTrash2 />}
				/>
			</div> */}
		</div>
	);
};

export default ListItem;
