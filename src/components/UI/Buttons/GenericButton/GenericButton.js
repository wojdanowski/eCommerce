import React from 'react';
import classes from './GenericButton.module.scss';

const GenericButton = (props) => {
	return (
		<button
			className={classes.genericButton}
			disabled={props.isDisabled}
			onClick={props.clicked}
		>
			{props.label}
		</button>
	);
};

export default GenericButton;
