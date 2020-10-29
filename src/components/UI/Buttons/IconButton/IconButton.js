import React from 'react';
import classes from './IconButton.module.scss';
import { IconContext } from 'react-icons';

const IconButton = (props) => {
	let color;

	if (props.isRemoved) {
		color = { color: 'red' };
	} else if (props.isModified && !props.isRemoved) {
		color = { color: 'green' };
	}
	color = props.isDisabled ? { color: '#e7e7e7' } : color;

	const disabled = props.isDisabled ? classes.isDisabled : null;
	const appendClasses = [classes.buttonContainer, disabled];

	return (
		<IconContext.Provider
			value={{ size: '1.6rem', className: 'defaultIcon', ...color }}
		>
			<div className={appendClasses.join(' ')} onClick={props.clicked}>
				{props.icon}
			</div>
		</IconContext.Provider>
	);
};

export default IconButton;
