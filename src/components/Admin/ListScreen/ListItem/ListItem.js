import React from 'react';

import classes from './ListItem.module.scss';
import IconButton from '../../../UI/Buttons/IconButton/IconButton';
import EditStatus from './../../UI/EditStatus/EditStatus';

const ListItem = (props) => {
	let colorStyle;
	if (props.removed) {
		colorStyle = 'utilOnRemove';
	} else {
		colorStyle = null;
	}
	const appendClasses = [classes.itemContainer, colorStyle];
	const buttons = props.buttons ? props.buttons : [];

	return (
		<div className={appendClasses.join(' ')}>
			{props.children}
			<div className={'utilToolbox'}>
				<EditStatus isEdited={props.edited} />
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
							isModified={props.edited}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ListItem;
