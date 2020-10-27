import React from 'react';

import classes from './ListItem.module.scss';
import IconButton from '../../../UI/Buttons/IconButton/IconButton';

const ListItem = (props) => {
	const removed = props.removed ? classes.onRemove : null;
	const appendClasses = [classes.itemContainer, removed];
	const buttons = props.buttons ? props.buttons : [];

	return (
		<div className={appendClasses.join(' ')}>
			{props.children}
			<div className={'utilToolbox'}>
				{buttons.map((button, index) => {
					let disabledStatus = props.removed;
					let buttonHandler = button.handler;
					if (button.type === 'delete') {
						disabledStatus = null;
					}

					return (
						<IconButton
							key={index}
							icon={button.icon}
							clicked={buttonHandler}
							isDisabled={disabledStatus}
							isRemoved={props.removed}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ListItem;
