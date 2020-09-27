import React from 'react';
import classes from './CloseButton.module.scss';

const CloseButton = (props) => {
	return (
		<div>
			<div class={classes.close} onClick={props.clicked}></div>
		</div>
	);
};

export default CloseButton;
