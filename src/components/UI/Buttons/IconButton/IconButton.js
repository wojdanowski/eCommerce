import React from 'react';
import classes from './IconButton.module.scss';
import { IconContext } from 'react-icons';

const IconButton = (props) => {
	let color;

	if (props.isRemoved) {
		color = { color: 'red' };
	}
	// color = props.isRemoved ? { color: 'red' } : color;
	color = props.isDisabled ? { color: '#706f6f25' } : color;

	const disabled = props.isDisabled ? classes.isDisabled : null;
	const hidden = props.isHidden ? classes.isHidden : null;
	const appendClasses = [hidden, disabled, classes.buttonContainer];

	return (
		<IconContext.Provider
			value={{
				size: props.size ? props.size : '1.6rem',
				className: 'defaultIcon',
				...color,
			}}
		>
			<div className={appendClasses.join(' ')} onClick={props.clicked}>
				{props.icon}
			</div>
		</IconContext.Provider>
	);
};

export default IconButton;
