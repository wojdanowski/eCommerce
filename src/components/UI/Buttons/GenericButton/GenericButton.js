import React from 'react';
import classes from './GenericButton.module.scss';

const GenericButton = (props) => {
	return (
		<div className={classes.genericButton} onClick={props.clicked}>
			{props.label}
		</div>
	);
};

export default GenericButton;
