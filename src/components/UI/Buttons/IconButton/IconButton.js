import React from 'react';
import classes from './IconButton.module.scss';
import { IconContext } from 'react-icons';

const IconButton = (props) => {
	return (
		<IconContext.Provider
			value={{ size: '1.6rem', className: 'defaultIcon' }}
		>
			<div className={classes.buttonContainer} onClick={props.clicked}>
				{props.icon}
			</div>
		</IconContext.Provider>
	);
};

export default IconButton;
