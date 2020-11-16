import React from 'react';

import classes from './ListItem.module.scss';
import IconButton from '../../../UI/Buttons/IconButton/IconButton';
import EditStatus from '../../../UI/EditStatus/EditStatus';

const ListItem = (props) => {
	let colorStyle;
	if (props.removed) {
		colorStyle = 'utilOnRemove';
	} else {
		colorStyle = null;
	}
	const appendClasses = [classes.itemContainer, colorStyle];
	let toolbox = null;
	if (props.buttons) {
		toolbox = (
			<div className={classes.tools}>
				<div>
					<EditStatus isEdited={props.edited} />
				</div>
				<div className={`utilToolbox`}>
					{props.buttons.map((button, index) => {
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
	}

	return (
		<div className={appendClasses.join(' ')}>
			{props.children}
			{toolbox}
		</div>
	);
};

export default ListItem;
